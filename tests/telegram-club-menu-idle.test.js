'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const redis = require('../lib/redis');
const values = new Map(), due = new Map();
redis.isConfigured = () => true;
redis.pipeline = async commands => commands.map(([cmd,key,...args]) => {
  let result;
  if (cmd === 'SET') { if (args.includes('NX') && values.has(key)) result = null; else {values.set(key,args[0]);result='OK';} }
  else if (cmd === 'GET') result=values.get(key)||null;
  else if (cmd === 'DEL') result=Number(values.delete(key));
  else if (cmd === 'ZADD') {due.set(args[1],Number(args[0]));result=1;}
  else if (cmd === 'ZREM') result=Number(due.delete(args[0]));
  else if (cmd === 'ZRANGEBYSCORE') result=[...due].filter(([,time])=>time<=Number(args[1])).map(([id])=>id);
  else if (cmd === 'EVAL') {const [,lock,token]=args;result=values.get(lock)===token ? Number(values.delete(lock)) : 0;}
  else throw Error('Unexpected command '+cmd);
  return {result};
});
const idle = require('../lib/telegram-club-menu-idle');
const club = require('../lib/telegram-club-commands');
const message = {chat:{id:-100,type:'supergroup'},message_id:42};
const saved = () => JSON.parse(values.get('poker_app:telegram:club_menu:-100:42'));

test('each group menu click schedules a fresh 60-second reset; stale deliveries do nothing', async t => {
  values.clear();due.clear();
  const oldFetch=global.fetch, oldNow=Date.now, originalEnv={...process.env};
  t.after(()=>{global.fetch=oldFetch;Date.now=oldNow;process.env=originalEnv;});
  process.env.QSTASH_TOKEN='test';process.env.CRON_SECRET='secret';process.env.APP_URL='https://example.test';
  let now=100000;Date.now=()=>now;
  const calls=[];
  global.fetch=async(url,options)=>{calls.push({url,options,body:JSON.parse(options.body)});return {ok:true,json:async()=>({ok:true})};};
  const click=action=>club.handle({callback_query:{id:'callback',data:'club:'+action,message}},'bot');
  await click('menu');
  const first=saved();assert.equal(first.dueAt,160000);
  const publish=calls.find(call=>call.url.includes('/v2/publish/'));
  assert.equal(publish.options.headers['Upstash-Delay'],'60s');
  assert.equal(publish.options.headers['Upstash-Forward-X-Cron-Secret'],'secret');
  now=145000;await click('schedule:0');const second=saved();
  assert.equal(second.dueAt,205000);assert.notEqual(first.revision,second.revision);
  let edits=0;const edit=async()=>{edits++};
  assert.equal(await idle.restore(first.id,first.revision,edit,160000),false);
  assert.equal(await idle.restore(second.id,second.revision,edit,204999),false);
  assert.equal(await idle.restore(second.id,second.revision,edit,205000),true);
  assert.equal(edits,1);
  assert.equal(await idle.restore(second.id,second.revision,edit,206000),false);
  await click('schedule:1');const third=saved();await click('pulse');
  assert.equal(await idle.restore(third.id,third.revision,edit,999999),false);
});

test('failed edits remain retryable, timers are isolated by message, and busy menus are protected', async t => {
  values.clear();due.clear();const previous=process.env.QSTASH_TOKEN;delete process.env.QSTASH_TOKEN;
  t.after(()=>{if(previous!==undefined)process.env.QSTASH_TOKEN=previous;});
  await idle.arm(message,'cash:0');const state=saved();
  await idle.arm({...message,message_id:43},'tournaments:0');
  await assert.rejects(idle.restore(state.id,state.revision,async()=>{throw Error('offline')},state.dueAt));
  assert.ok(saved());
  await idle.withLock(state.id,async()=>{
    await assert.rejects(idle.restore(state.id,state.revision,async()=>{},state.dueAt),/being updated/);
  });
  assert.equal(await idle.restore(state.id,state.revision,async()=>{},state.dueAt),true);
  assert.ok(values.has('poker_app:telegram:club_menu:-100:43'));
});

test('restoring only edits the original message with the same root buttons', async t => {
  const old=global.fetch;t.after(()=>global.fetch=old);let call;
  global.fetch=async(url,options)=>{call={url,body:JSON.parse(options.body)};return {json:async()=>({ok:true})};};
  await club.restoreRoot(message,'bot');
  assert.ok(call.url.endsWith('/editMessageText'));
  assert.equal(call.body.chat_id,-100);assert.equal(call.body.message_id,42);
  assert.deepEqual(call.body.reply_markup,club.rootMenu().reply_markup);
});

test('timer endpoint rejects unauthenticated requests without editing Telegram', async t => {
  const old=process.env.CRON_SECRET;process.env.CRON_SECRET='correct';
  t.after(()=>{if(old===undefined)delete process.env.CRON_SECRET;else process.env.CRON_SECRET=old;});
  const handler=require('../lib/api-handlers/cron-club-menu-idle');
  const res={setHeader(){},status(code){this.code=code;return this},json(body){this.body=body}};
  await handler({method:'POST',headers:{'x-cron-secret':'wrong'},body:{id:'-100:42'}},res);
  assert.equal(res.code,403);
});

test('cron fallback restores only due menus when delayed delivery is unavailable', async t => {
  values.clear();due.clear();
  const oldNow=Date.now,oldToken=process.env.QSTASH_TOKEN;
  delete process.env.QSTASH_TOKEN;
  let now=1000;Date.now=()=>now;
  t.after(()=>{Date.now=oldNow;if(oldToken!==undefined)process.env.QSTASH_TOKEN=oldToken;});
  await idle.arm(message,'menu');
  now=31000;await idle.arm({...message,message_id:44},'cash:0');
  now=61000;const edited=[];
  assert.deepEqual(await idle.sweep(async message=>edited.push(message.message_id)),{restored:1,failed:0});
  assert.deepEqual(edited,[42]);
  assert.ok(values.has('poker_app:telegram:club_menu:-100:44'));
});
