'use strict';
const crypto = require('crypto');
const Engine = require('../../app-monkey-race-engine');
const { authRequired, parseBody, setCors } = require('../api-auth');
const redis = require('../redis');
const { PROFILE_HASH_KEY } = require('../pokerplus');
const { canonicalAccountId } = require('../account-canonical');
const PREFIX = 'poker_app:monkey_race:v1:';
const TTL = 7200;
const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || '';
const clean = value => String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 60);
const id = value => /^[a-f0-9]{12}$/.test(String(value || '')) ? String(value) : '';
const makeId = () => crypto.randomBytes(6).toString('hex');
const seed = () => crypto.randomBytes(4).readUInt32LE();
const key = (type, value) => PREFIX + type + (value ? ':' + value : '');
async function commands(list) {
  const rows = await redis.pipeline(list, { throwOnError: true, context: 'monkey-race' });
  if (!rows || rows.some(row => !row || row.error)) throw new Error('Game storage unavailable');
  return rows.map(row => row.result);
}
async function load(k) { const [raw] = await commands([['GET', k]]); return raw ? JSON.parse(raw) : null; }
function name(auth) {
  const u = auth.identity || {};
  return clean([u.firstName || u.first_name, u.lastName || u.last_name].filter(Boolean).join(' ') || u.name || u.telegramUsername || u.pwaUsername || u.username || 'Игрок клуба');
}
async function clubNames(members) {
  if(!members.length)return [];
  const [mapped] = await commands([['HMGET', 'poker_app:visitor_dt_ids', ...members]]);
  const accounts = await Promise.all(members.map((member,i) => canonicalAccountId(/^ID\d{6}$/.test(member) ? member : /^(?:tg|vk|mail)_ID\d{6}$/.test(member) ? member.replace(/^(?:tg|vk|mail)_/, '') : mapped[i] || member)));
  const [profiles, display, legacyDisplay] = await commands([
    ['HMGET', PROFILE_HASH_KEY, ...accounts], ['HMGET', 'poker_app:visitor_chat_display_names', ...accounts], ['HMGET', 'poker_app:visitor_chat_display_names', ...members]
  ]);
  return members.map((_,i)=>{let p={};try{p=JSON.parse(profiles[i]||'{}')||{};}catch(_){}return clean(p.nickname || p.Nike || p.nick || p.name || p.displayName || display[i] || legacyDisplay[i]).trim();});
}
async function runFor(auth, runSeed, room, startAt) {
  return { id: makeId(), member: String(auth.memberId), name: (await clubNames([String(auth.memberId)]))[0] || name(auth), seed: runSeed,
    version: room ? 4 : 3, room: room || '', startAt: startAt || Date.now() };
}
async function saveRun(run) { await commands([['SET', key('run', run.id), JSON.stringify(run), 'EX', TTL]]); }
async function rate(member, action) {
  const limit = action === 'progress' || action === 'room' ? 150 : action === 'leaderboard' ? 30 : 25;
  const k = key('rate', member + ':' + action + ':' + Math.floor(Date.now() / 60000));
  const [count] = await commands([['EVAL', "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],90) end; return n", 1, k]]);
  return Number(count) <= limit;
}
async function leaderboard(member) {
  const board = key('top');
  const [raw, rank, best] = await commands([
    ['ZREVRANGE', board, 0, 19, 'WITHSCORES'], ['ZREVRANK', board, member || '_guest_'], ['ZSCORE', board, member || '_guest_']
  ]);
  const ids = []; for (let i = 0; i < (raw || []).length; i += 2) ids.push(raw[i]);
  const [names, nicknames] = await Promise.all([ids.length ? commands([['HMGET', key('names'), ...ids]]).then(rows=>rows[0]) : [], clubNames(ids)]);
  return { ok: true, rows: ids.map((who, i) => ({ name: nicknames[i] || clean(names[i]) || 'Игрок клуба', score: Number(raw[i * 2 + 1]), mine: who === member, place: i + 1 })),
    best: Number(best) || 0, place: rank == null ? null : Number(rank) + 1 };
}
async function roomState(roomId, member) {
  const room = await load(key('room', roomId));
  if (!room) return { status: 404, error: 'Дуэль не найдена или истекла. Создайте новую.' };
  const side = room.host.member === member ? 'host' : room.guest && room.guest.member === member ? 'guest' : '';
  if (!side) return { status: 403, error: 'Сначала присоединитесь к дуэли.' };
  const own = room[side], other = room[side === 'host' ? 'guest' : 'host'];
  const [myProgress, opponent] = await Promise.all([load(key('progress', own.runId)), other ? load(key('progress', other.runId)) : null]);
  const result = myProgress && myProgress.finished && opponent && opponent.finished
    ? myProgress.score === opponent.score ? 'draw' : myProgress.score > opponent.score ? 'win' : 'lose' : null;
  return { ok: true, roomId, seed: room.seed, startAt: room.startAt || null, serverNow: Date.now(), runId: own.runId,
    name: own.name, opponentName: other ? other.name : '', opponent: opponent || null, mine: myProgress || null,
    round: room.round || 1, rematchReady: !!(room.rematch && room.rematch[side]), opponentReady: !!(room.rematch && room.rematch[side === 'host' ? 'guest' : 'host']), result, waiting: !room.guest, expired: !result && !!room.startAt && Date.now() > room.startAt + 12 * 60 * 1000 };
}
const FINISH = "local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end; local r=cjson.decode(raw); if r.member~=ARGV[1] then return -1 end; redis.call('DEL',KEYS[1]); redis.call('SET',KEYS[2],ARGV[2],'EX',7200); if tonumber(ARGV[3])>=0 then redis.call('ZADD',KEYS[3],'GT',ARGV[3],ARGV[1]); redis.call('HSET',KEYS[4],ARGV[1],ARGV[4]); end; return 1";
const JOIN = "local raw=redis.call('GET',KEYS[1]); if not raw then return 'missing' end; local r=cjson.decode(raw); if r.host.member==ARGV[1] then return 'host' end; if r.guest then if r.guest.member==ARGV[1] then return 'guest' else return 'full' end end; r.guest=cjson.decode(ARGV[2]); r.startAt=tonumber(ARGV[3]); local hostRaw=redis.call('GET',KEYS[2]); if not hostRaw then return 'missing' end; local h=cjson.decode(hostRaw); h.startAt=r.startAt; redis.call('SET',KEYS[2],cjson.encode(h),'EX',7200); redis.call('SET',KEYS[3],ARGV[4],'EX',7200); redis.call('SET',KEYS[1],cjson.encode(r),'EX',7200); return 'joined'";
// One atomic room transition: readiness is tied to the completed run, never to a later round.
const REMATCH = "local raw=redis.call('GET',KEYS[1]); if not raw then return 'missing' end; local r=cjson.decode(raw); local side=nil; if r.host.member==ARGV[1] then side='host' elseif r.guest and r.guest.member==ARGV[1] then side='guest' else return 'forbidden' end; if r[side].runId~=ARGV[2] then return 'stale' end; if not r.guest then return 'unfinished' end; local a=redis.call('GET',KEYS[2]); local b=redis.call('GET',KEYS[3]); if not (a and b and cjson.decode(a).finished and cjson.decode(b).finished) then return 'unfinished' end; r.rematch=r.rematch or {}; r.rematch[side]=true; if r.rematch.host and r.rematch.guest then local h=cjson.decode(ARGV[3]); local g=cjson.decode(ARGV[4]); r.host.runId=h.id; r.guest.runId=g.id; r.seed=h.seed; r.startAt=h.startAt; r.round=(r.round or 1)+1; r.rematch={}; redis.call('SET',KEYS[4],ARGV[3],'EX',7200); redis.call('SET',KEYS[5],ARGV[4],'EX',7200); end; redis.call('SET',KEYS[1],cjson.encode(r),'EX',7200); return 'ready'";
module.exports = async function handler(req, res) {
  setCors(res, 'POST, OPTIONS', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  let body; try { body = parseBody(req); } catch (_) { return res.status(400).json({ ok: false, error: 'Неверный JSON.' }); }
  if (!redis.isConfigured()) return res.status(503).json({ ok: false, error: 'Рекорды и дуэли пока недоступны. Можно играть в тренировке.' });
  const auth = authRequired(req, body, token);
  const action = clean(body.action);
  if (!['start', 'finish', 'leaderboard', 'create', 'join', 'room', 'progress', 'abandon', 'rematch'].includes(action)) return res.status(400).json({ ok: false, error: 'Unknown action' });
  if (!auth.ok && action !== 'leaderboard') return res.status(401).json({ ok: false, error: 'Войдите в аккаунт для рекордов клуба и дуэлей.' });
  const member = auth.ok ? String(auth.memberId) : '';
  try {
    if (!await rate(member || 'guest', action)) return res.status(429).json({ ok: false, error: 'Слишком много запросов. Попробуйте чуть позже.' });
    if (action === 'leaderboard') return res.json(await leaderboard(member));
    if (action === 'start') { const run = await runFor(auth, seed()); await saveRun(run); return res.json({ ok: true, runId: run.id, seed: run.seed, version: run.version }); }
    if (action === 'create') {
      const roomId = makeId(), roomSeed = seed(), run = await runFor(auth, roomSeed, roomId);
      const room = { seed: roomSeed, host: { member, name: run.name, runId: run.id }, guest: null, createdAt: Date.now() };
      await commands([['SET', key('run', run.id), JSON.stringify(run), 'EX', TTL], ['SET', key('room', roomId), JSON.stringify(room), 'EX', TTL]]);
      return res.json(await roomState(roomId, member));
    }
    if (action === 'join') {
      const roomId = id(body.roomId), room = roomId ? await load(key('room', roomId)) : null;
      if (!room) return res.status(404).json({ ok: false, error: 'Дуэль не найдена или истекла.' });
      const startAt = Date.now() + 5000, run = await runFor(auth, room.seed, roomId, startAt);
      const guest = { member, name: run.name, runId: run.id };
      const [joined] = await commands([['EVAL', JOIN, 3, key('room', roomId), key('run', room.host.runId), key('run', run.id), member, JSON.stringify(guest), startAt, JSON.stringify(run)]]);
      if (joined === 'full') return res.status(409).json({ ok: false, error: 'В этой дуэли уже два игрока.' });
      if (joined === 'missing') return res.status(404).json({ ok: false, error: 'Дуэль истекла.' });
      return res.json(await roomState(roomId, member));
    }
    if (action === 'room') {
      const state = await roomState(id(body.roomId), member);
      if (state.error) return res.status(state.status).json({ ok: false, error: state.error });
      return res.json(state);
    }
    if (action === 'rematch') {
      const roomId = id(body.roomId), room = roomId ? await load(key('room', roomId)) : null;
      if (!room) return res.status(404).json({ ok: false, error: 'Дуэль истекла.' });
      if (room.host.member !== member && (!room.guest || room.guest.member !== member)) return res.status(403).json({ ok: false, error: 'Вы не участник дуэли.' });
      if (!room.guest) return res.status(409).json({ ok: false, error: 'Дождитесь второго игрока.' });
      const nextSeed = seed(), startAt = Date.now() + 5000;
      const nextRun = side => ({ id: makeId(), member: side.member, name: side.name, seed: nextSeed, version: room ? 4 : 3, room: roomId, startAt });
      const host = nextRun(room.host), guest = nextRun(room.guest);
      const [result] = await commands([['EVAL', REMATCH, 5, key('room', roomId), key('progress', room.host.runId), key('progress', room.guest.runId), key('run', host.id), key('run', guest.id), member, id(body.runId), JSON.stringify(host), JSON.stringify(guest)]]);
      if (result === 'unfinished') return res.status(409).json({ ok: false, error: 'Соперник ещё доигрывает.' });
      if (result === 'missing' || result === 'forbidden') return res.status(409).json({ ok: false, error: 'Дуэль недоступна.' });
      return res.json(await roomState(roomId, member));
    }
    const runId = id(body.runId), run = runId ? await load(key('run', runId)) : null;
    if (!run || run.member !== member) return res.status(409).json({ ok: false, error: 'Полёт истёк или уже сохранён.' });
    if (action === 'progress') {
      if (!run.room) return res.status(400).json({ ok: false, error: 'Not a duel' });
      // Live positions are decorative. Only the deterministic finish replay affects results.
      const tick = Math.max(0, Math.min(Engine.MAX_TICKS, Math.floor(Number(body.tick) || 0)));
      const y = Math.max(24, Math.min(Engine.FLOOR, Number(body.y) || 270));
      const taps = Array.isArray(body.taps) ? body.taps : [];
      const base=run.version>=3?7:5;
      if (taps.length > Math.ceil(Engine.MAX_TICKS / 7) || taps.some((t, i) => !Number.isInteger(t) || t < 0 || Math.floor(t/base) >= tick || t%base<1 || t%base>=base || (i && Math.floor(t/base)-Math.floor(taps[i-1]/base)<7))) return res.status(400).json({ ok: false, error: 'Invalid live replay' });
      const progress = { tick, y, taps, score: Math.max(0, Math.min(100000, Math.floor(Number(body.score) || 0))), finished: false, at: Date.now() };
      const [saved] = await commands([['EVAL', "if redis.call('EXISTS',KEYS[1])==0 then return 0 end; local p=redis.call('GET',KEYS[2]); if p then local v=cjson.decode(p); if v.finished or v.tick>tonumber(ARGV[2]) then return 0 end end; redis.call('SET',KEYS[2],ARGV[1],'EX',7200); return 1", 2, key('run', runId), key('progress', runId), JSON.stringify(progress), tick]]);
      return res.json({ ok: true, saved: !!saved });
    }
    let progress;
    if (action === 'abandon') {
      progress = { finished: true, forfeited: true, score: -1, tick: 0, at: Date.now() };
    } else {
      let flight; try { flight = Engine.replay(run.seed, body.taps, body.ticks, run.version); } catch (_) { return res.status(400).json({ ok: false, error: 'Не удалось подтвердить полёт.' }); }
      if (Date.now() < run.startAt + flight.tick * 1000 / 60 - 2500) return res.status(400).json({ ok: false, error: 'Полёт завершён слишком быстро.' });
      progress = { finished: true, score: flight.score, perfect: flight.perfect, tick: flight.tick, y: flight.y, at: Date.now() };
    }
    const [saved] = await commands([['EVAL', FINISH, 4, key('run',runId),key('progress',runId),key('top'),key('names'),member,JSON.stringify(progress),progress.score,run.name]]);
    if (Number(saved) !== 1) return res.status(409).json({ ok: false, error: 'Этот полёт уже завершён.' });
    return res.json({ ok: true, score: progress.score, ...(await leaderboard(member)), roomId: run.room });
  } catch (error) {
    console.error('[monkey-race]', action, error.message);
    return res.status(503).json({ ok: false, error: 'Не удалось связаться с сервером игры. Попробуйте снова.' });
  }
};
