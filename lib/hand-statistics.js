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
  const positions = ['UTG','UTG+1','UTG+2','UTG+3','LJ','HJ','CO','BTN','SB','BB','BTN/SB','UNKNOWN'];
  function searchName(value) {
    return String(value || '').normalize('NFKC').toLowerCase().replace(/ё/g,'е').replace(/[^0-9a-zа-я_]+/g,'');
  }
  function profileSearchNormalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/^@+/, "")
      .replace(/ё/g, "е")
      .replace(/[^0-9a-zа-я_]+/gi, "")
      .trim();
  }

  function profileSearchKeyboardRuToEn(value) {
    var map = {
      "й": "q", "ц": "w", "у": "e", "к": "r", "е": "t", "н": "y", "г": "u", "ш": "i", "щ": "o", "з": "p", "х": "[", "ъ": "]",
      "ф": "a", "ы": "s", "в": "d", "а": "f", "п": "g", "р": "h", "о": "j", "л": "k", "д": "l", "ж": ";", "э": "'",
      "я": "z", "ч": "x", "с": "c", "м": "v", "и": "b", "т": "n", "ь": "m", "б": ",", "ю": "."
    };
    return String(value || "").replace(/[А-Яа-яЁё]/g, function (ch) {
      var low = ch.toLowerCase().replace(/ё/g, "е");
      var next = map[low] || ch;
      return ch === low ? next : String(next).toUpperCase();
    });
  }

  function profileSearchRuToLatin(value) {
    var map = {
      "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e", "ж": "zh", "з": "z", "и": "i", "й": "y",
      "к": "k", "л": "l", "м": "m", "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f",
      "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch", "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya"
    };
    return String(value || "").replace(/[А-Яа-яЁё]/g, function (ch) {
      var low = ch.toLowerCase();
      var next = map[low] != null ? map[low] : ch;
      return ch === low ? next : String(next).toUpperCase();
    });
  }

  function profileSearchLatinToRu(value) {
    var text = String(value || "").toLowerCase();
    [
      ["shch", "щ"], ["yo", "ё"], ["zh", "ж"], ["kh", "х"], ["ts", "ц"],
      ["ch", "ч"], ["sh", "ш"], ["yu", "ю"], ["ya", "я"], ["ye", "е"], ["oo", "у"]
    ].forEach(function (pair) {
      text = text.split(pair[0]).join(pair[1]);
    });
    var map = {
      a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "х",
      i: "и", j: "дж", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п",
      q: "к", r: "р", s: "с", t: "т", u: "у", v: "в", w: "в", x: "кс",
      y: "й", z: "з"
    };
    return text.replace(/[a-z]/g, function (letter) { return map[letter] || letter; });
  }

  function profileSearchPhoneticKey(value) {
    var text = profileSearchRuToLatin(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "")
      .replace(/0/g, "o");
    text = text
      .replace(/i([bcdfghjklmnpqrstvwxyz])e/g, "ai$1")
      .replace(/a([bcdfghjklmnpqrstvwxyz])e/g, "ei$1");
    [
      ["shch", "sch"], ["ph", "f"], ["wh", "w"], ["kh", "h"], ["ck", "k"],
      ["qu", "kv"], ["oo", "u"], ["ee", "i"], ["oe", "e"], ["x", "ks"],
      ["q", "k"], ["c", "k"], ["w", "v"], ["y", "i"]
    ].forEach(function (pair) {
      text = text.split(pair[0]).join(pair[1]);
    });
    return text;
  }

  function profileSearchForms(value) {
    var source = String(value || "").trim();
    var variants = [
      source,
      source.replace(/^@+/, ""),
      profileSearchKeyboardRuToEn(source),
      profileSearchRuToLatin(source),
      profileSearchLatinToRu(source),
      profileSearchPhoneticKey(source)
    ];
    var out = [];
    variants.forEach(function (variant) {
      var normalized = profileSearchNormalizeText(variant);
      if (normalized && out.indexOf(normalized) === -1) out.push(normalized);
      var noIdPrefix = normalized.replace(/^id/i, "");
      if (noIdPrefix && noIdPrefix !== normalized && out.indexOf(noIdPrefix) === -1) out.push(noIdPrefix);
    });
    return out;
  }


  function matchesSearch(row, options) {
    const id=String(options.handQuery || '').trim(), opponent=searchName(options.opponentQuery), forms=profileSearchForms(options.opponentQuery);
    return (!id || row.handId.includes(id)) && (!opponent || (row.opponents || []).some(p=>profileSearchForms(p.name).some(name=>forms.some(query=>name.includes(query))) || searchName(p.playerId).includes(opponent)));
  }
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
    if (o.position && !positions.includes(o.position)) throw new Error('Invalid position');
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
      const fingerprint = JSON.stringify([row.playedAt, row.cards.slice().sort(), row.resultMinor, row.bigBlindMinor, row.position || 'UNKNOWN', row.showdown]);
      if (seen.has(key)) {
        if (seen.get(key).fingerprint === fingerprint) duplicates++;
        else conflicts.add(key);
        return;
      }
      seen.set(key, {row, label, fingerprint});
    });
    const positionGroups = new Map();
    seen.forEach(({row, label}, key) => {
      if (conflicts.has(key)) return;
      if (!matchesSearch(row,o)) return;
      const position = positions.includes(row.position) ? row.position : 'UNKNOWN';
      if (!positionGroups.has(position)) positionGroups.set(position, {position, count:0, resultMinor:0, bb:0});
      const pg = positionGroups.get(position);
      pg.count++; pg.resultMinor += row.resultMinor; pg.bb += row.resultMinor / row.bigBlindMinor;
      if (!Number.isSafeInteger(pg.resultMinor)) throw new Error('Amount exceeds safe integer range');
      if (o.position && position !== o.position) return;
      if (!groups.has(label)) groups.set(label, {label, count: 0, resultMinor: 0, bb: 0, wins: 0, losses: 0, even: 0, hands: []});
      const g = groups.get(label);
      if (!Number.isSafeInteger(g.resultMinor + row.resultMinor)) throw new Error('Amount exceeds safe integer range');
      g.count++; g.resultMinor += row.resultMinor; g.bb += row.resultMinor / row.bigBlindMinor;
      g[row.resultMinor > 0 ? 'wins' : row.resultMinor < 0 ? 'losses' : 'even']++;
      // Only the allowed personal projection is exposed to the UI.
      g.hands.push({handId: row.handId, sessionId: row.sessionId, playedAt: row.playedAt,
        position, showdown: typeof row.showdown==='boolean'?row.showdown:null, cards: row.cards.slice(), resultMinor: row.resultMinor, bb: row.resultMinor / row.bigBlindMinor});
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
      bb: count ? bb : null, bb100: count ? bb * 100 / count : null, cells, excluded, duplicates, positions: positions.map(position => {
        const g=positionGroups.get(position);
        return g ? {...g, bb100:g.bb*100/g.count} : {position,count:0,resultMinor:null,bb:null,bb100:null};
      })};
  }
  function profitSeries(hands, unit) {
    let total=0,showdown=0,nonShowdown=0,unknown=0;
    const points=[{count:0,total:0,showdown:0,nonShowdown:0}];
    hands.slice().sort((a,b)=>a.playedAt.localeCompare(b.playedAt)||a.handId.localeCompare(b.handId)).forEach((h,i)=>{
      const value=unit==='resultMinor'?h.resultMinor/100:h.bb;
      total+=value;
      if(h.showdown===true)showdown+=value;else if(h.showdown===false)nonShowdown+=value;else unknown++;
      points.push({count:i+1,total,showdown,nonShowdown,handId:h.handId});
    });
    return {points,unknown};
  }
  return {profitSeries, handClass, matrix, aggregate, positions, searchName, matchesSearch};
});
