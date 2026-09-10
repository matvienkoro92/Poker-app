"use strict";
const { pipeline, isConfigured } = require('./redis');
const { resolveTelegramIdentity, memberIdFromIdentity } = require('./resolve-telegram-auth');
const { resolveNewsAccountId } = require('./api-handlers/friends');
const { rejectBlockedAppUser } = require('./app-user-blocks');
const { setCors, isAdminIdentity } = require('./api-auth');
const { rateLimit, rejectIfPayloadTooLarge } = require('./api-limits');
const { PROFILE_HASH_KEY, BIND_HASH_KEY, NICKNAME_REVERSE_HASH_KEY } = require('./pokerplus');
async function redis(commands) {
  const rows = await pipeline(commands, { context: 'club-social' });
  if (!Array.isArray(rows) || rows.length !== commands.length || rows.some(r => !r || r.error)) throw new Error('Хранилище временно недоступно');
  return rows.map(r => r.result);
}
function clean(value, max) { return String(value == null ? '' : value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').trim().slice(0, max); }
async function memberProfile(accountId) {
  const [raw, bound, display] = await redis([['HGET',PROFILE_HASH_KEY,accountId],['HGET',BIND_HASH_KEY,accountId],['HGET','poker_app:visitor_chat_display_names',accountId]]);
  let p = {}; try { p = JSON.parse(raw || '{}') || {}; } catch (_) {}
  const nick = bound ? clean(p.nickname || p.Nike || p.nick || p.name,80) : '';
  return { accountId, nick, name: clean(display,80) || nick || 'Игрок ' + accountId, bound: !!bound };
}
async function coachAccount() {
  const key = 'poker_app:reviews:coach_account';
  const [saved] = await redis([['GET',key]]);
  if (saved) return String(saved);
  const [candidate] = await redis([['HGET',NICKNAME_REVERSE_HASH_KEY,'fishkopcheny']]);
  if (!candidate || !/^ID\d+$/.test(candidate)) return '';
  const p = await memberProfile(candidate);
  if (p.nick.toLowerCase() !== 'fishkopcheny' || !p.bound) return '';
  await redis([['SET',key,candidate,'NX']]);
  return String((await redis([['GET',key]]))[0] || '');
}
async function context(req,res,bucket) {
  setCors(res,'POST, OPTIONS');res.setHeader('Cache-Control','private, no-store');
  if(req.method==='OPTIONS'){res.status(200).end();return null;}
  if(req.method!=='POST'){res.status(405).json({ok:false,error:'POST only'});return null;}
  if(rejectIfPayloadTooLarge(req,res,600000))return null;
  let body;try{body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};}catch(_){res.status(400).json({ok:false,error:'Некорректный запрос'});return null;}
  if(!body || typeof body!=='object' || Array.isArray(body)){res.status(400).json({ok:false,error:'Некорректный запрос'});return null;}
  const identity=resolveTelegramIdentity(req,body,process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN||'');
  const member=identity&&memberIdFromIdentity(identity);
  if(!member || /^guest_/.test(member)){res.status(401).json({ok:false,error:'Войдите в аккаунт'});return null;}
  if(await rejectBlockedAppUser(req,res,identity,member))return null;
  if(!isConfigured()){res.status(503).json({ok:false,error:'Хранилище временно недоступно'});return null;}
  const accountId=await resolveNewsAccountId(identity,member);
  if(!accountId){res.status(401).json({ok:false,error:'Аккаунт не найден'});return null;}
  const mutation=!['list','summary','get','read',undefined].includes(body.action);
  const limit=body.action==='create'?8:mutation?30:90;
  if(rateLimit(req,res,{bucket:bucket+':'+(body.action==='create'?'create':mutation?'write':'read'),key:accountId,limit,windowMs:60000}))return null;
  return {body,accountId,admin:!!isAdminIdentity(identity,member)};
}
module.exports={redis,clean,memberProfile,coachAccount,context};
