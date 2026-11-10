'use strict';
const { authRequired, parseBody, setCors } = require('../api-auth');
const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || '';
module.exports = async function(req, res) {
  setCors(res, 'GET, POST, OPTIONS', 'Content-Type'); res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method === 'GET' && req.query?.avatar) {
    const id = String(req.query.id || ''), entryId = String(req.query.avatar);
    if (!/^[A-HJ-NP-Z2-9]{10}$/.test(id) || !/^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(entryId)) return res.status(404).end();
    try {
      const accountId = await require('../nards-tournament-runtime').runtime().avatarAccount(id, entryId);
      if (!accountId) return res.status(404).end();
      const [avatar] = await require('../board-games-service').commands([['GET', 'poker_app:avatar:' + accountId.replace(/[^a-zA-Z0-9_-]/g, '_')]]);
      return require('./avatar').respondWithAvatarImage(res, avatar, accountId);
    } catch { return res.status(503).end(); }
  }
  if (req.method !== 'POST') return res.status(405).json({ ok: false });
  if (Number(req.headers?.['content-length'] || 0) > 10000) return res.status(413).json({ ok: false, error: 'Слишком большой запрос.' });
  let body;
  try { body = parseBody(req); } catch { return res.status(400).json({ ok: false, error: 'Неверный JSON.' }); }
  const auth = authRequired(req, body, token);
  if (!auth.ok || !require('../billiards-access').hasBilliardsAccess(auth.identity, auth.memberId)) return res.status(401).json({ ok: false, error: 'Войдите в аккаунт.' });
  try {
    const { commands } = require('../board-games-service');
    const [count] = await commands([['EVAL', "local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],60) end;return n", 1, 'poker_app:nards-tournaments:rate:' + auth.memberId]]);
    if (Number(count) > 120) return res.status(429).json({ ok: false, error: 'Слишком много запросов. Подождите минуту.' });
    if (body.action === 'join') {
      const gate = await require('../game-participation-gate').check(String(auth.memberId), token, auth.identity);
      if (!gate.ok) return res.status(gate.code === 'GAME_SUBSCRIPTION_UNAVAILABLE' ? 503 : 403).json(gate);
    }
    const result = await require('../nards-tournament-runtime').runtime().call(String(auth.memberId), body, { admin: auth.isAdmin, identity: auth.identity });
    return res.json(result);
  } catch (e) {
    if (!e.status) console.error('[nards-tournaments]', e.message);
    return res.status(e.status || 503).json({ ok: false, error: e.status ? e.message : 'Не удалось обновить турнир. Повторите попытку.' });
  }
};
