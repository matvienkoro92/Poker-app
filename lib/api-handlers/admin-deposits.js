'use strict';
const {authRequired, parseBody, setCors} = require('../api-auth');
const {verifyAccessToken} = require('../admin-menu-access-token');
const redis = require('../redis');
const {applyOperation, view} = require('../admin-deposits');
const KEY = 'poker21:admin-deposits:v1';
const CAS = "local old=redis.call('GET',KEYS[1]); if (old or '')~=ARGV[1] then return 0 end; redis.call('SET',KEYS[1],ARGV[2]); return 1";
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN || '';
module.exports = async function(req, res) {
  setCors(res, 'POST, OPTIONS', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ok:false,error:'POST only'});
  try {
    const body = parseBody(req);
    if (JSON.stringify(body).length > 15000) return res.status(413).json({ok:false,error:'Слишком много текста'});
    const auth = authRequired(req, body, BOT_TOKEN, {adminOnly:true});
    if (!auth.ok) return res.status(auth.status || 403).json({ok:false,error:'Доступ только для администраторов'});
    if (!verifyAccessToken(body.accessToken, 'deposits', auth.memberId, BOT_TOKEN)) return res.status(403).json({ok:false,code:'password_required',error:'Введите пароль раздела ещё раз'});
    if (!redis.isConfigured()) return res.status(503).json({ok:false,error:'Хранилище временно недоступно'});
    for (let attempt = 0; attempt < 5; attempt++) {
      const rows = await redis.pipeline([['GET', KEY]], {throwOnError:true,context:'admin-deposits.read'});
      const raw = rows[0].result || '';
      const state = raw ? JSON.parse(raw) : {revision:0,entries:[],requests:[]};
      if (body.action === 'list') return res.status(200).json({ok:true,...view(state)});
      // Keep credentials out of the persistent audit journal.
      const operation = {action:body.action, requestId:body.requestId, entryId:body.entryId,
        entry:body.entry, amount:body.amount, depositorId:body.depositorId, depositorRoom:body.depositorRoom, note:body.note, paymentId:body.paymentId, reservationId:body.reservationId, returnId:body.returnId, total:body.total, reason:body.reason};
      const identity = auth.identity || {};
      const actorName = [identity.first_name, identity.last_name].filter(Boolean).join(' ') || identity.name || (identity.email ? identity.email.split('@')[0] : 'Администратор');
      const result = applyOperation(state, operation, auth.memberId, Date.now(), actorName);
      if (result.duplicate) return res.status(200).json({ok:true,...view(result.state)});
      const saved = await redis.pipeline([['EVAL',CAS,1,KEY,raw,JSON.stringify(result.state)]], {throwOnError:true,context:'admin-deposits.write'});
      if (Number(saved[0].result) === 1) return res.status(200).json({ok:true,...view(result.state)});
    }
    return res.status(409).json({ok:false,error:'Другой админ обновляет данные. Повторите операцию.'});
  } catch(e) {
    return res.status(e.status || (e instanceof SyntaxError ? 400 : 503)).json({ok:false,error:e.status ? e.message : e instanceof SyntaxError ? 'Некорректные данные' : 'Не удалось сохранить или загрузить данные. Повторите попытку.'});
  }
};
