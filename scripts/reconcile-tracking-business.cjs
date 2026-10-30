#!/usr/bin/env node
'use strict';
// Explicit maintenance task; dry-run by default. Only missing, receipt-backed events are added.
const fs = require('node:fs');
const root = process.cwd(), args = process.argv.slice(2), apply = args.includes('--apply');
const option = (name, fallback) => args.find(v => v.startsWith(name + '='))?.slice(name.length + 1) || fallback;
const envFile = option('--env-file', '');
if (envFile) for (const line of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
  const m = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^(['"])(.*)\1$/, '$2');
}
const redis = require('../lib/redis');
// A local audit snapshot makes interrupted read-only runs resumable. Apply must use fresh reads.
const cacheFile = option('--read-cache', ''), cache = cacheFile && fs.existsSync(cacheFile) ? JSON.parse(fs.readFileSync(cacheFile, 'utf8')) : {};
if (apply && cacheFile) throw Error('apply_requires_fresh_reads');
const originalPipeline = redis.pipeline;
redis.pipeline = async (commands, options = {}) => {
  const result = new Array(commands.length), misses = [];
  commands.forEach((command, index) => {
    const key = JSON.stringify(command), cacheable = cacheFile && ['HGET','HMGET','HSCAN','SSCAN','GET','MGET','LRANGE','SCARD','SISMEMBER'].includes(command[0]);
    if (cacheable && Object.hasOwn(cache, key)) result[index] = { result: cache[key] };
    else misses.push({ command, index, key, cacheable });
  });
  if (misses.length) {
    let rows;
    for (let attempt = 0; ; attempt++) {
      try {
        rows = await originalPipeline(misses.map(m => m.command), { ...options, timeoutMs: 20000, throwOnError: true });
        if (!rows || rows.length !== misses.length || rows.some(r => !r || r.error)) throw Error('incomplete_read');
        break;
      } catch (error) { if (attempt === 2) throw error; }
    }
    misses.forEach((m, i) => { result[m.index] = rows[i]; if (m.cacheable) cache[m.key] = rows[i].result; });
    if (cacheFile) fs.writeFileSync(cacheFile, JSON.stringify(cache));
  }
  return result;
};
for (const [method, op] of [['sscanall','SSCAN'],['hscanall','HSCAN']]) redis[method] = async (key, options = {}) => {
  let cursor = '0', all = [], pages = 0;
  do {
    const rows = await redis.pipeline([[op, key, cursor, 'COUNT', String(options.count || 500)]], options);
    const page = rows[0].result;
    if (!Array.isArray(page) || !Array.isArray(page[1])) throw Error('incomplete_scan');
    all.push(...page[1]); cursor = String(page[0]);
    if (++pages >= (options.maxPages || 100) && cursor !== '0') throw Error('scan_limit');
  } while (cursor !== '0');
  return op === 'SSCAN' ? [...new Set(all)] : Object.fromEntries(Array.from({length: all.length / 2}, (_, i) => [all[i * 2], all[i * 2 + 1]]));
};
const attr = require('../lib/tracking-attribution');
const { missingEvents } = require('../lib/tracking-business-reconcile');
const { isBroadcast } = require('../lib/tracking-link-kind');
const { eventFlags } = require('../lib/tracking-link-milestones');
const { ACCOUNT_KNOWN_AT, registrationStatus } = require('../lib/tracking-registration-status');
const P = 'poker_app:attribution:v1:';
const parse = v => { try { return JSON.parse(v || 'null'); } catch (_) { return null; } };
const reportPath = option('--report', '/tmp/tracking-business-reconciliation.json');
async function read(commands) {
  if (!commands.length) return [];
  for (let attempt = 0; ; attempt++) {
    try {
      const rows = await redis.pipeline(commands, { context: 'tracking.reconcile', timeoutMs: 20000, throwOnError: true, allowLargeRedisRead: true });
      if (!rows || rows.length !== commands.length || rows.some(r => !r || r.error)) throw Error('incomplete_read');
      return rows.map(r => r.result);
    } catch (error) { if (attempt === 2) throw error; }
  }
}
async function batches(values, size, fn) { for (let i = 0; i < values.length; i += size) await fn(values.slice(i, i + size)); }
async function main() {
  const meta = await redis.hscanall('poker_app:track_links:meta', { count: 500, maxPages: 100, context: 'tracking.reconcile' });
  if (!meta) throw Error('incomplete_links');
  const links = Object.entries(meta).map(([id, value]) => ({ ...parse(value), id })).filter(l => !isBroadcast(l));
  const refs = new Set(links.map(l => l.id)), accounts = new Map(), linkGroups = new Map();
  for (const link of links) {
    const groups = await attr.actorGroups(link.id); linkGroups.set(link.id, groups);
    for (const [actor, subjects] of groups) {
      if (!accounts.has(actor)) accounts.set(actor, { actor, subjects: new Set([actor]), events: [], contexts: [], receipts: [], presence: [] });
      subjects.forEach(s => accounts.get(actor).subjects.add(s));
    }
  }
  const installationSubjects = [...new Set([...accounts.values()].flatMap(a => [...a.subjects]))];
  const installationSets = new Map();
  await batches(installationSubjects, 40, async batch => {
    const pages = await read(batch.map(id => ['SSCAN', P + 'installations:' + id, '0', 'COUNT', '200']));
    for (let i = 0; i < batch.length; i++) {
      if (!Array.isArray(pages[i]) || !Array.isArray(pages[i][1])) throw Error('incomplete_installations');
      installationSets.set(batch[i], String(pages[i][0]) === '0' ? pages[i][1] : await redis.sscanall(P + 'installations:' + batch[i], { count: 200, maxPages: 100 }));
    }
  });
  for (const a of accounts.values()) for (const subject of [...a.subjects]) installationSets.get(subject).forEach(id => a.subjects.add(id));
  const verifiedAccounts = [...accounts.values()].filter(a => /^ID\d{6}$/.test(a.actor));
  await batches(verifiedAccounts, 40, async batch => {
    const values = await read(batch.map(a => ['HGET', 'poker_app:id_to_user', a.actor]));
    batch.forEach((a, i) => { if (values[i]) a.subjects.add(values[i]); });
  });
  const subjects = [...new Set([...accounts.values()].flatMap(a => [...a.subjects]))], sources = new Map();
  await batches(subjects, 20, async batch => {
    const values = await read(batch.flatMap(id => [['HGET', P + 'contexts', id], ['HGET', 'poker_app:pokerplus_user_ids', id], ['HGET', 'poker_app:email_linked_at', id], ['HGET', 'poker_app:telegram_login_at', id]]));
    batch.forEach((id, i) => sources.set(id, { context: parse(values[i * 4]), pokerId: values[i * 4 + 1], registrations: [values[i * 4 + 2], values[i * 4 + 3]] }));
  });
  const subjectEvents = new Map();
  await batches(subjects, 40, async batch => {
    const pages = await read(batch.map(id => ['HSCAN', P + 'events:' + id, '0', 'COUNT', '1000']));
    for (let i = 0; i < batch.length; i++) {
      const page = pages[i]; if (!Array.isArray(page) || !Array.isArray(page[1])) throw Error('incomplete_events');
      const values = String(page[0]) === '0' ? page[1].filter((_, n) => n % 2 === 1) : Object.values(await redis.hscanall(P + 'events:' + batch[i], { count: 1000, maxPages: 100 }));
      subjectEvents.set(batch[i], values.map(parse).filter(Boolean));
    }
  });
  for (const a of accounts.values()) {
    a.contexts = [...a.subjects].map(id => sources.get(id)?.context).filter(Boolean);
    a.events = [...new Map([...a.subjects].flatMap(id => subjectEvents.get(id) || []).map(e => [e.id, e])).values()];
    a.pokerIds = [...new Set([...a.subjects].map(id => sources.get(id)?.pokerId).filter(Boolean))];
    const dates = [...a.subjects].flatMap(id => sources.get(id)?.registrations || []).map(attr.timestamp).filter(Number.isFinite);
    a.registrationAt = dates.length ? Math.min(...dates) : null;
  }
  const accountRows = [...accounts.values()].filter(a => /^ID\d{6}$/.test(a.actor));
  const gameOwners = new Map(), gameIndexReads = [];
  for (const a of accountRows) {
    const first = Math.min(...a.contexts.map(c => Number(c.first.at)));
    if (!Number.isFinite(first)) continue;
    const owners = [...a.subjects].filter(id => !/^(ins_|w_)/.test(id));
    const commands = owners.map(id => ['LRANGE', 'poker_app:daily_poker_games_user:' + id, '0', '-1']);
    // Daily lists preserve receipts that fell outside the latest-500 list.
    const days = require('../lib/player-crm-utils').dateKeysBetween(new Date(first - 86400000).toISOString().slice(0, 10), new Date().toISOString().slice(0, 10));
    owners.forEach(id => days.forEach(day => commands.push(['LRANGE', 'poker_app:daily_poker_games_date:' + id + ':' + day, '0', '-1'])));
    commands.forEach(command => gameIndexReads.push({ actor: a.actor, command }));
  }
  console.error('Sources and events read; scanning game indexes for ' + accountRows.length + ' accounts');
  await batches(gameIndexReads, 40, async batch => {
    const values = await read(batch.map(row => row.command));
    values.forEach((ids, i) => { if (!Array.isArray(ids)) throw Error('incomplete_game_index'); ids.forEach(id => {
      if (!gameOwners.has(id)) gameOwners.set(id, new Set()); gameOwners.get(id).add(batch[i].actor);
    }); });
  });
  console.error('Reading ' + gameOwners.size + ' saved game receipts');
  await batches([...gameOwners.keys()], 80, async ids => {
    const [values] = await read([['MGET', ...ids.map(id => 'poker_app:daily_poker_game:' + id)]]);
    if (!Array.isArray(values) || values.length !== ids.length) throw Error('incomplete_games');
    values.forEach((raw, i) => {
      const g = parse(raw); if (!g) return;
      for (const actor of gameOwners.get(ids[i])) {
        const a = accounts.get(actor);
        if (!a.subjects.has(g.user_id)) continue;
        a.receipts.push({ type: 'daily_poker_spin', operationId: g.idempotency_key, at: Date.parse(g.created_at), proof: { key: 'poker_app:daily_poker_game:' + ids[i], userId: g.user_id } });
      }
    });
  });
  const [raffleIds] = await read([['LRANGE', 'poker_app:raffle_ids', '0', '-1']]);
  const subjectAccounts = new Map(), pokerAccounts = new Map();
  for (const a of accountRows) {
    for (const id of a.subjects) { if (!subjectAccounts.has(id)) subjectAccounts.set(id, new Set()); subjectAccounts.get(id).add(a.actor); }
    for (const id of a.pokerIds) { if (!pokerAccounts.has(String(id))) pokerAccounts.set(String(id), new Set()); pokerAccounts.get(String(id)).add(a.actor); }
  }
  let unknownRaffleDates = 0;
  await batches([...new Set(raffleIds)], 30, async ids => {
    const [raffles, lists] = await read([['MGET', ...ids.map(id => 'poker_app:raffle:' + id)], ['MGET', ...ids.map(id => 'poker_app:raffle_participants_data:' + id)]]);
    ids.forEach((id, i) => {
      const r = parse(raffles[i]), participants = parse(lists[i]) || r?.participants || [];
      if (!Array.isArray(participants)) throw Error('invalid_participants');
      for (const p of participants) {
        let candidates = subjectAccounts.get(p.accountId) || subjectAccounts.get(p.userId);
        // Do not override an explicit different account with today's Poker21 binding.
        if (!candidates && !p.accountId && !p.userId) candidates = pokerAccounts.get(String(p.p21Id || ''));
        if (!candidates || candidates.size !== 1) continue;
        const at = Date.parse(p.joinedAt || p.createdAt || p.manualTicketsAddedAt || '');
        if (!Number.isFinite(at)) {
          const a = accounts.get([...candidates][0]), firstSource = Math.min(...a.contexts.map(c => Number(c.first.at)));
          const closedAt = Date.parse(r?.endDate || r?.drawnAt || '');
          // These old lists have no join timestamp, but a raffle closed before
          // acquisition cannot be a later action from this source.
          if (Number.isFinite(closedAt) && closedAt < firstSource) {
            a.presence.push({ at: closedAt, proof: { key: 'poker_app:raffle_participants_data:' + id, userId: p.userId, accountId: p.accountId || '', closedAt: r.endDate || r.drawnAt } });
          } else unknownRaffleDates++;
          continue;
        }
        accounts.get([...candidates][0]).receipts.push({ type: 'raffle_joined', operationId: id, section: id, at,
          proof: { key: 'poker_app:raffle_participants_data:' + id, accountId: p.accountId || '', userId: p.userId || '' } });
      }
    });
  });
  await batches(accountRows, 40, async batch => {
    const values = await read(batch.map(a => ['HGET', ACCOUNT_KNOWN_AT, a.actor]));
    batch.forEach((a, i) => {
      a.knownRaw = values[i] || '';
      a.knownAt = attr.timestamp(a.knownRaw);
      const proofs = a.receipts.concat(a.presence).filter(r => Number.isFinite(r.at)).sort((x, y) => x.at - y.at);
      const firstVisit = Math.min(...a.contexts.map(c => Number(c.first.at)));
      if (proofs.length && proofs[0].at < firstVisit && (!Number.isFinite(a.knownAt) || proofs[0].at < a.knownAt)) {
        a.historyCorrection = { accountId: a.actor, at: proofs[0].at, previous: a.knownRaw, proof: proofs[0].proof };
        a.knownAt = proofs[0].at;
      }
    });
  });
  const report = { at: new Date().toISOString(), applied: false, accounts: accountRows.length, subjects: subjects.length,
    gamesInspected: gameOwners.size, rafflesInspected: raffleIds.length, unknownRaffleDates, missing: [], accountHistoryCorrections: accountRows.map(a => a.historyCorrection).filter(Boolean), links: [] };
  for (const a of accountRows) {
    a.missing = missingEvents(a.actor, a.contexts, a.events, a.receipts, refs);
    report.missing.push(...a.missing.map(m => ({ accountId: a.actor, ...m })));
  }
  for (const link of links) {
    const totals = { id: link.id, label: link.label, players: 0, accounts: 0, registrations: 0, returning: 0, registrationUnknown: 0, before: { spins: 0, raffles: 0 }, after: { spins: 0, raffles: 0 } };
    for (const actor of linkGroups.get(link.id).keys()) {
      const a = accounts.get(actor); if (!a.contexts.length) continue;
      const context = a.contexts.reduce((c, n) => attr.mergeContext(c, n), null);
      const row = { accountId: /^ID\d{6}$/.test(actor) ? actor : '', context, registrationAt: a.registrationAt };
      const before = eventFlags(a.events, row, link.id), after = eventFlags(a.events.concat((a.missing || []).map(m => m.event)), row, link.id);
      totals.players++; if (row.accountId) { totals.accounts++; const status = registrationStatus(row.accountId, a.registrationAt, a.knownAt, context.first.at); if (status === 'unknown') totals.registrationUnknown++; else if (status === 'returning') totals.returning++; else if (context.first.ref === link.id) totals.registrations++; }
      totals.before.spins += before.spinCount || 0; totals.before.raffles += before.raffleCount || 0;
      totals.after.spins += after.spinCount || 0; totals.after.raffles += after.raffleCount || 0;
    }
    totals.coverage = await require('../lib/tracking-link-coverage').readCoverage(link.id, [...linkGroups.get(link.id).keys()].map(actor => ({actor, accountId: /^ID\d{6}$/.test(actor) ? actor : ''})));
    const [clicks] = await read([['HGET', 'poker_app:track_links:totals', link.id]]); totals.clicks = Number(clicks) || 0;
    report.links.push(totals);
  }
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2)); // Evidence is saved before any write.
  if (apply) {
    for (const correction of report.accountHistoryCorrections) {
      await require('../lib/redis-atomic').atomicWrite([['HSET', ACCOUNT_KNOWN_AT, correction.accountId, String(correction.at)]], {
        values: [
          { key: ACCOUNT_KNOWN_AT, field: correction.accountId, value: correction.previous },
          { key: 'poker_app:account_redirects', field: correction.accountId, value: '' },
        ], context: 'tracking.reconcile.account-history',
      });
    }
    await batches(report.missing, 60, async missing => {
      const commands = missing.map(m => ['HSETNX', P + 'events:' + m.accountId, m.event.id, JSON.stringify(m.event)]);
      const results = await read(commands);
      if (results.some(n => n !== 0 && n !== 1)) throw Error('incomplete_reconciliation');
    });
    report.applied = true; fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
  console.log(JSON.stringify({ ...report, missing: report.missing.map(m => ({ accountId: m.accountId, type: m.event.type, at: m.event.at, ref: m.event.ref })), reportPath }, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
