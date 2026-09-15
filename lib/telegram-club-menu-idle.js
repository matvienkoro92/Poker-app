'use strict';
const crypto = require('node:crypto');
const redis = require('./redis');
const PREFIX = 'poker_app:telegram:club_menu:';
const DUE = PREFIX + 'due';
const IDLE_MS = 60000;
const options = {context:'telegram-club-menu-idle',throwOnError:true};
const idFor = message => String(message.chat.id) + ':' + String(message.message_id);
async function run(commands) {
  const rows = await redis.pipeline(commands, options);
  if (!rows || rows.some(row => row.error)) throw new Error('Menu timer storage unavailable');
  return rows;
}
async function withLock(id, work) {
  const key = PREFIX + 'lock:' + id, token = crypto.randomUUID();
  const rows = await run([['SET',key,token,'NX','EX','55']]);
  if (rows[0]?.result !== 'OK') throw new Error('Menu is being updated');
  try { return await work(); }
  finally { await run([['EVAL',"if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end",'1',key,token]]); }
}
async function arm(message, action) {
  const id = idFor(message), key = PREFIX + id;
  if (action === 'pulse') {
    await run([['DEL',key],['ZREM',DUE,id]]);
    return;
  }
  const state = {id, revision:crypto.randomUUID(), dueAt:Date.now()+IDLE_MS, message};
  await run([['SET',key,JSON.stringify(state),'EX','86400'],['ZADD',DUE,state.dueAt,id]]);
  const base = [process.env.APP_URL,process.env.MINI_APP_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL]
    .find(value => /^https?:\/\//.test(value || '') && !/^https?:\/\/t\.me\//.test(value));
  if (!process.env.QSTASH_TOKEN || !process.env.CRON_SECRET || !base) return;
  try {
    const destination = base.replace(/\/$/,'') + '/api/cron-club-menu-idle';
    const response = await fetch((process.env.QSTASH_URL || 'https://qstash.upstash.io').replace(/\/$/,'') + '/v2/publish/' + encodeURIComponent(destination), {
      method:'POST', headers:{Authorization:'Bearer '+process.env.QSTASH_TOKEN,'Content-Type':'application/json',
        'Upstash-Delay':'60s','Upstash-Forward-X-Cron-Secret':process.env.CRON_SECRET},
      body:JSON.stringify({id,revision:state.revision}), signal:AbortSignal.timeout(4000)
    });
    if (!response.ok) throw new Error('Timer publish failed');
  } catch (_) { console.error('[club-menu] Delayed timer unavailable; cron will retry'); }
}
async function restore(id, revision, edit, now = Date.now()) {
  if (!/^-?\d+:\d+$/.test(id)) return false;
  return withLock(id, async () => {
    const rows = await run([['GET',PREFIX+id]]);
    const state = rows[0]?.result ? JSON.parse(rows[0].result) : null;
    if (!state) { await run([['ZREM',DUE,id]]); return false; }
    if ((revision && revision !== state.revision) || now < state.dueAt) return false;
    await edit(state.message);
    await run([['DEL',PREFIX+id],['ZREM',DUE,id]]);
    return true;
  });
}
async function sweep(edit) {
  const rows = await run([['ZRANGEBYSCORE',DUE,'-inf',Date.now(),'LIMIT','0','30']]);
  let restored = 0, failed = 0;
  for (const id of rows[0]?.result || []) {
    try { if (await restore(id, null, edit)) restored++; } catch (_) { failed++; }
  }
  return {restored,failed};
}
module.exports = {arm,restore,sweep,withLock,idFor,IDLE_MS};
