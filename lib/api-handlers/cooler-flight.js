'use strict';
const crypto = require('crypto');
const Engine = require('../../app-cooler-flight-engine');
const { authRequired, parseBody, setCors } = require('../api-auth');
const redis = require('../redis');
const PREFIX = 'poker_app:cooler_flight:v1:';
const TTL = 7200;
const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || '';
const clean = value => String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 60);
const id = value => /^[a-f0-9]{12}$/.test(String(value || '')) ? String(value) : '';
const makeId = () => crypto.randomBytes(6).toString('hex');
const seed = () => crypto.randomBytes(4).readUInt32LE();
const key = (type, value) => PREFIX + type + (value ? ':' + value : '');
async function commands(list) {
  const rows = await redis.pipeline(list, { throwOnError: true, context: 'cooler-flight' });
  if (!rows || rows.some(row => !row || row.error)) throw new Error('Game storage unavailable');
  return rows.map(row => row.result);
}
async function load(k) { const [raw] = await commands([['GET', k]]); return raw ? JSON.parse(raw) : null; }
function name(auth) {
  const u = auth.identity || {};
  return clean([u.first_name, u.last_name].filter(Boolean).join(' ') || u.name || u.username || 'Игрок клуба');
}
function runFor(auth, runSeed, room, startAt) {
  return { id: makeId(), member: String(auth.memberId), name: name(auth), seed: runSeed,
    version: Engine.VERSION, room: room || '', startAt: startAt || Date.now() };
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
  const names = ids.length ? (await commands([['HMGET', key('names'), ...ids]]))[0] : [];
  return { ok: true, rows: ids.map((who, i) => ({ name: clean(names[i]) || 'Игрок клуба', score: Number(raw[i * 2 + 1]), mine: who === member, place: i + 1 })),
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
    result, waiting: !room.guest, expired: !!room.startAt && Date.now() > room.startAt + 12 * 60 * 1000 };
}
const FINISH = "local raw=redis.call('GET',KEYS[1]); if not raw then return 0 end; local r=cjson.decode(raw); if r.member~=ARGV[1] then return -1 end; redis.call('DEL',KEYS[1]); redis.call('SET',KEYS[2],ARGV[2],'EX',7200); if tonumber(ARGV[3])>=0 then redis.call('ZADD',KEYS[3],'GT',ARGV[3],ARGV[1]); redis.call('HSET',KEYS[4],ARGV[1],ARGV[4]); end; return 1";
const JOIN = "local raw=redis.call('GET',KEYS[1]); if not raw then return 'missing' end; local r=cjson.decode(raw); if r.host.member==ARGV[1] then return 'host' end; if r.guest then if r.guest.member==ARGV[1] then return 'guest' else return 'full' end end; r.guest=cjson.decode(ARGV[2]); r.startAt=tonumber(ARGV[3]); local hostRaw=redis.call('GET',KEYS[2]); if not hostRaw then return 'missing' end; local h=cjson.decode(hostRaw); h.startAt=r.startAt; redis.call('SET',KEYS[2],cjson.encode(h),'EX',7200); redis.call('SET',KEYS[3],ARGV[4],'EX',7200); redis.call('SET',KEYS[1],cjson.encode(r),'EX',7200); return 'joined'";
module.exports = async function handler(req, res) {
  setCors(res, 'POST, OPTIONS', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  let body; try { body = parseBody(req); } catch (_) { return res.status(400).json({ ok: false, error: 'Неверный JSON.' }); }
  if (!redis.isConfigured()) return res.status(503).json({ ok: false, error: 'Рекорды и дуэли пока недоступны. Можно играть в тренировке.' });
  const auth = authRequired(req, body, token);
  const action = clean(body.action);
  if (!['start', 'finish', 'leaderboard', 'create', 'join', 'room', 'progress', 'abandon'].includes(action)) return res.status(400).json({ ok: false, error: 'Unknown action' });
  if (!auth.ok && action !== 'leaderboard') return res.status(401).json({ ok: false, error: 'Войдите в аккаунт для рекордов клуба и дуэлей.' });
  const member = auth.ok ? String(auth.memberId) : '';
  try {
    if (!await rate(member || 'guest', action)) return res.status(429).json({ ok: false, error: 'Слишком много запросов. Попробуйте чуть позже.' });
    if (action === 'leaderboard') return res.json(await leaderboard(member));
    if (action === 'start') { const run = runFor(auth, seed()); await saveRun(run); return res.json({ ok: true, runId: run.id, seed: run.seed, version: run.version }); }
    if (action === 'create') {
      const roomId = makeId(), roomSeed = seed(), run = runFor(auth, roomSeed, roomId);
      const room = { seed: roomSeed, host: { member, name: run.name, runId: run.id }, guest: null, createdAt: Date.now() };
      await commands([['SET', key('run', run.id), JSON.stringify(run), 'EX', TTL], ['SET', key('room', roomId), JSON.stringify(room), 'EX', TTL]]);
      return res.json(await roomState(roomId, member));
    }
    if (action === 'join') {
      const roomId = id(body.roomId), room = roomId ? await load(key('room', roomId)) : null;
      if (!room) return res.status(404).json({ ok: false, error: 'Дуэль не найдена или истекла.' });
      const startAt = Date.now() + 5000, run = runFor(auth, room.seed, roomId, startAt);
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
    const runId = id(body.runId), run = runId ? await load(key('run', runId)) : null;
    if (!run || run.member !== member) return res.status(409).json({ ok: false, error: 'Полёт истёк или уже сохранён.' });
    if (action === 'progress') {
      if (!run.room) return res.status(400).json({ ok: false, error: 'Not a duel' });
      // Live positions are decorative. Only the deterministic finish replay affects results.
      const tick = Math.max(0, Math.min(Engine.MAX_TICKS, Math.floor(Number(body.tick) || 0)));
      const y = Math.max(24, Math.min(Engine.FLOOR, Number(body.y) || 270));
      const progress = { tick, y, score: Math.max(0, Math.min(1000, Math.floor(Number(body.score) || 0))), finished: false, at: Date.now() };
      const [saved] = await commands([['EVAL', "if redis.call('EXISTS',KEYS[1])==0 then return 0 end; local p=redis.call('GET',KEYS[2]); if p then local v=cjson.decode(p); if v.finished or v.tick>tonumber(ARGV[2]) then return 0 end end; redis.call('SET',KEYS[2],ARGV[1],'EX',7200); return 1", 2, key('run', runId), key('progress', runId), JSON.stringify(progress), tick]]);
      return res.json({ ok: true, saved: !!saved });
    }
    let progress;
    if (action === 'abandon') {
      progress = { finished: true, forfeited: true, score: -1, tick: 0, at: Date.now() };
    } else {
      let flight; try { flight = Engine.replay(run.seed, body.taps, body.ticks); } catch (_) { return res.status(400).json({ ok: false, error: 'Не удалось подтвердить полёт.' }); }
      if (Date.now() < run.startAt + flight.tick * 1000 / 60 - 2500) return res.status(400).json({ ok: false, error: 'Полёт завершён слишком быстро.' });
      progress = { finished: true, score: flight.score, perfect: flight.perfect, tick: flight.tick, y: flight.y, at: Date.now() };
    }
    const [saved] = await commands([['EVAL', FINISH, 4, key('run', runId), key('progress', runId), key('top'), key('names'), member, JSON.stringify(progress), progress.score, run.name]]);
    if (Number(saved) !== 1) return res.status(409).json({ ok: false, error: 'Этот полёт уже завершён.' });
    return res.json({ ok: true, score: progress.score, ...(await leaderboard(member)), roomId: run.room });
  } catch (error) {
    console.error('[cooler-flight]', action, error.message);
    return res.status(503).json({ ok: false, error: 'Не удалось связаться с сервером игры. Попробуйте снова.' });
  }
};
