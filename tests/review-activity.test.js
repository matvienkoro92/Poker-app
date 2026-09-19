'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { createRequire } = require('node:module');

function load(file, stubs) {
  const filename = path.join(__dirname, '..', file), module = { exports: {} }, localRequire = createRequire(filename);
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), { module, exports: module.exports,
    require: name => Object.hasOwn(stubs, name) ? stubs[name] : localRequire(name), console, process, Date, Intl, Buffer }, { filename });
  return module.exports;
}
function harness() {
  const values = new Map(), hashes = new Map(), locks = new Map(), commits = [];
  const hget = (key, field) => (hashes.get(key) || {})[field];
  const hset = (key, field, value) => hashes.set(key, { ...(hashes.get(key) || {}), [field]: String(value) });
  let failCommit = false, race = false, beforeCommit = null;
  const legacy = [],lists=new Map();
  hset('bindings','ID123456','123');hset('bindings','ID999999','999');
  const redis = async commands => commands.map(([op, key, ...args]) => {
    if (op === 'GET') return values.get(key) || null;
    if (op === 'HGET') return hget(key, args[0]) || null;
    if (op === 'HEXISTS') return hget(key, args[0]) ? 1 : 0;
    if (op === 'LRANGE') return (lists.get(key)||[]).slice(Number(args[0]),Number(args[1])+1);
    if (op === 'ZREVRANGE') return legacy.slice(Number(args[0]), Number(args[1]) + 1);
    if (op === 'EVAL' && key.includes('review-legacy-hand-check')) {
      const n=Number(args[0]), keys=args.slice(1,n+1), [authorId,handId]=args.slice(n+1);
      return keys.some(key=>{const t=JSON.parse(values.get(key)||'{}');return t.authorId===authorId&&t.handId===handId;})?1:0;
    }
    throw new Error('Unexpected read ' + op);
  });
  const ledger = load('lib/bonus-ledger.js', {});
  const commit = async (commands, opts) => {
    if(beforeCommit){const callback=beforeCommit;beforeCommit=null;callback();}
    if (failCommit) throw new Error('offline');
    if (race) { race = false; throw new Error('value_changed'); }
    for (const lock of opts.locks.filter(Boolean)) assert.equal(locks.get(lock.key), lock.value);
    for (const guard of opts.values) assert.equal((guard.field?hget(guard.key,guard.field):values.get(guard.key)) || '', guard.value);
    for (const balance of opts.balances) assert.equal(Number(hget(balance.key, balance.userId) || 0), balance.value);
    commits.push({ commands, opts });
    for (const [op, key, ...args] of commands) {
      if (op === 'SET') values.set(key, String(args[0]));
      else if (op === 'HSET') hset(key, args[0], args[1]);
      else if (op === 'INCRBY') values.set(key, String(Number(values.get(key) || 0) + Number(args[0])));
      else if(op==='LPUSH')lists.set(key,[args[0],...(lists.get(key)||[])]);
      else if(op==='LTRIM')lists.set(key,(lists.get(key)||[]).slice(Number(args[0]),Number(args[1])+1));
      else if (!['ZADD', 'SADD', 'SREM', 'LPUSH', 'INCR'].includes(op)) throw new Error('Unexpected write ' + op);
    }
  };
  const activity = load('lib/review-activity.js', {
    './club-social': { redis }, './redis-atomic': { atomicWrite: commit },
    './pokerplus': {BIND_HASH_KEY:'bindings',readBoundPokerPlusUserId:async id=>hget('bindings',id)||''},
    './bonus-ledger': { ...ledger,
      acquireRedisLock: async key => { if (locks.has(key)) return null; locks.set(key, 'token'); return { key, value: 'token' }; },
      releaseRedisLock: async lock => locks.delete(lock.key), getBonusBalance: async id => Number(hget('poker_app:bonus_balances', id) || 0) },
  });
  const actor = { accountId: 'ID123456', bound: true };
  function hand(id = '1') { return { id: 'thread-' + id, handId: id, type: 'hand', authorId: actor.accountId,
    question: 'Стоит ли здесь делать рейз против такого диапазона?', updatedAt: new Date().toISOString(), replies: [] }; }
  async function publish(id = '1', overrides = {}) {
    const thread = Object.assign(hand(id), overrides);
    values.set('poker_app:starting-hands:123:active', 'v1');
    hset('poker_app:starting-hands:123:v1', id, 'owned-replay');
    return activity.commit({ thread, actor, kind: 'create', raw: '', keys: ['thread:' + thread.id, 'all', 'mine'] });
  }
  async function comment(id, text = 'Я бы выбрал колл на флопе, потому что у соперника здесь много блефов и слабых попаданий, которые мы пока бьём.', overrides = {}) {
    const thread = Object.assign(hand(id), { authorId: 'ID999999' }, overrides);
    const reply = { id: 'reply-' + id, text };
    thread.replies.push(reply);
    const key = 'thread:' + id, raw = values.get(key) || '';
    await activity.commit({ thread, actor, kind: 'reply', raw, keys: [key, 'all'], result: { fresh: true, reply } });
    return reply;
  }
  return { activity, actor, values, hashes, locks, commits, publish, comment, hand, hget, legacy,
    beforeCommit:callback=>{beforeCommit=callback;},fail: value => { failCommit = value; }, race: () => { race = true; }, unbind: () => hset('bindings',actor.accountId,''),
    moveAccount:id=>{hset('bindings',actor.accountId,'');actor.accountId=id;hset('bindings',id,'123');} };
}

test('eligible text ignores whitespace, punctuation, quotes, links and emoji; canonical duplicate key', () => {
  const { activity: a } = harness();
  assert.equal(a.meaningfulText('КОЛЛ, 20! 😊 https://example.com/long "чужая цитата"\n> ещё цитата\n«цитата»'), 'колл20');
  assert.equal(a.meaningfulText('Рейз на тёрне'), a.meaningfulText(' РЕЙЗ\nна   тёрне!!!'));
});
test('one publication advances only the publication counter without paying money', async () => {
  const h = harness(); await h.publish();
  const a = await h.activity.summary(h.actor.accountId);
  assert.equal(a.publicationProgress, 1); assert.equal(a.commentProgress, 0); assert.equal(a.bonusEarned, 0); assert.equal(a.publicationsToday, 1);
  assert.equal(h.hget('poker_app:bonus_balances', h.actor.accountId), undefined);
  assert.equal(h.hget(h.activity.BONUS_EARNED_KEY, h.actor.accountId), undefined);
  const report=JSON.parse(h.hget(h.activity.REPORT_KEY,h.actor.accountId));
  assert.equal(report.bonusEarned,0);assert.equal(report.actions,1);assert.equal(report.publicationActions,1);assert.equal(report.commentActions,0);
  assert.equal(h.commits.length, 1);
  assert.ok(!h.commits[0].commands.some(cmd => cmd[0] === 'LPUSH' && cmd[1].includes('bonus_ledger')));
  assert.equal(h.locks.size, 0);
  assert.equal(await h.publish(), false); // same request/thread retry
  assert.equal((await h.activity.summary(h.actor.accountId)).actions, 1);
  await assert.rejects(h.publish('1', { id: 'new-request' }), /уже опубликована/);
});
test('seven publications per Moscow day; deletion cannot recover quota; reset does not reset progress', async () => {
  const h = harness(); for (let i = 1; i <= 7; i++) await h.publish(String(i));
  const firstCycle = await h.activity.summary(h.actor.accountId);
  assert.equal(firstCycle.publicationProgress, 2); assert.equal(firstCycle.commentProgress, 0); assert.equal(firstCycle.spinsAvailable, 1);
  await assert.rejects(h.publish('8'), /до 7 раздач/);
  h.values.delete('thread:thread-1');
  await assert.rejects(h.publish('9'), /до 7 раздач/);
  const state = await h.activity.readState(h.actor.accountId); state.publicationsDay = '2000-01-01';
  h.values.set(h.activity.stateKey(h.actor.accountId), JSON.stringify(state));
  h.values.delete(h.activity.PREFIX+'player_day:123');
  await h.publish('10');
  const result = await h.activity.summary(h.actor.accountId);
  assert.equal(result.publicationProgress, 3); assert.equal(result.commentProgress, 0); assert.equal(result.publicationsToday, 1); assert.equal(result.bonusEarned, 0);
  assert.equal(h.activity.day(new Date('2026-09-18T20:59:59Z')), '2026-09-18');
  assert.equal(h.activity.day(new Date('2026-09-18T21:00:00Z')), '2026-09-19');
});
test('publication and comment progress award spins independently', async () => {
  const h = harness(); await h.publish();
  const comments=[
    'На префлопе выбираю трибет увеличенного размера, потому что глубокие стеки позволят собрать большой банк с нашей сильной рукой.',
    'Ривер закрыл флеш и стрит, поэтому против крупной ставки осторожного соперника склоняюсь к пасу без подходящих блокеров.',
    'Я бы проверил статистику частоты продолженных ставок этого оппонента, прежде чем решать вопрос о защите большого блайнда.',
    'На баббле турнира потеря фишек намного болезненнее, чем приобретение аналогичного количества, стоит учитывать риск вылета.',
    'Против маленькой ставки флопа можно продолжать с гатшотом и оверкартой, если за нами не осталось агрессивных участников банка.',
    'Без позиции трудно реализовать эквити слабой пары. Предпочитаю чекать весь диапазон и принимать дальнейшее решение после действий соперника.'
  ];
  for (let i = 0; i < 4; i++) await h.comment('foreign-' + i, comments[i]);
  let a = await h.activity.summary(h.actor.accountId);
  assert.equal(a.actions, 5); assert.equal(a.publicationProgress, 1); assert.equal(a.commentProgress, 4); assert.equal(a.spinsEarned, 0); assert.equal(a.spinsAvailable, 0); assert.equal(a.bonusEarned, 0);
  await h.comment('another'); a = await h.activity.summary(h.actor.accountId);
  assert.equal(a.publicationProgress, 1); assert.equal(a.commentProgress, 0); assert.equal(a.spinsAvailable, 1);
});
test('short, own-thread, duplicate, second-in-thread and unbound comments remain allowed without reward', async () => {
  const h = harness(); await h.comment('short', 'Хорошая раздача');
  await h.comment('own', undefined, { authorId: h.actor.accountId });
  assert.equal((await h.activity.summary(h.actor.accountId)).actions, 0);
  const first = await h.comment('foreign'); assert.equal(first.activityAward.action, true);
  await h.comment('foreign', 'Совсем другая мысль про раздачу. '.repeat(4));
  await h.comment('duplicate');
  h.unbind(); await h.comment('unbound', 'Мнение нового игрока про эту ситуацию. '.repeat(4));
  assert.equal((await h.activity.summary(h.actor.accountId)).actions, 1);
});
test('short question, fabricated hand and unbound publication fail without money or progress', async () => {
  const h = harness();
  await assert.rejects(h.publish('1', { question: 'Как сыграть?' }), /20 букв/);
  await assert.rejects(h.publish('2', { handId: 'untrusted' }), /Мои раздачи/);
  await assert.rejects(h.publish('3', { handId: '99999' }), /не найдена/);
  h.unbind(); await assert.rejects(h.publish('4'), /Привяжите/);
  assert.equal(h.commits.length, 0); assert.equal(h.locks.size, 0);
});
test('legacy publications, including deleted ones, cannot be republished for rewards', async () => {
  const h=harness();h.legacy.push('old');
  h.values.set('poker_app:reviews:thread:old',JSON.stringify({...h.hand('1'),deleted:true}));
  await assert.rejects(h.publish('1'),/уже опубликована/);
  assert.equal(h.commits.length,0);
  assert.equal((await h.activity.summary(h.actor.accountId)).actions,0);
});
test('write failure or concurrent thread update cannot give a partial reward', async () => {
  const h = harness(); h.fail(true); await assert.rejects(h.publish(), /offline/);
  assert.equal((await h.activity.summary(h.actor.accountId)).actions, 0);
  assert.equal(h.hget('poker_app:bonus_balances', h.actor.accountId), undefined);
  assert.equal(h.locks.size, 0);
  h.fail(false); h.race(); assert.equal(await h.publish(), false);
  assert.equal((await h.activity.summary(h.actor.accountId)).actions, 0);
  await h.publish(); assert.equal((await h.activity.summary(h.actor.accountId)).actions, 1);
});
test('concurrent requests cannot overrun publication quota', async () => {
  const h = harness(); await h.publish('1'); await h.publish('2'); await h.publish('3'); await h.publish('4');
  const results = await Promise.allSettled([h.publish('5'), h.publish('6')]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal((await h.activity.summary(h.actor.accountId)).publicationsToday, 5);
});
test('activity spins are separate from daily state, can grant one extra and cannot become negative', () => {
  const { activity: a } = harness(); const original = { ...a.emptyState(), spinsAvailable: 2, actions: 10, spinsEarned: 2 };
  const next = a.spendSpin(original, 'activity', { grantsExtraAttempt: true });
  assert.equal(original.spinsAvailable, 2); assert.equal(next.spinsAvailable, 1); assert.equal(next.extraSpins, 1);
  const usedExtra = a.spendSpin(next, 'activity-extra', { grantsExtraAttempt: true });
  assert.equal(usedExtra.extraSpins, 0); assert.equal(usedExtra.spinsAvailable, 1);
  assert.throws(() => a.spendSpin(usedExtra, 'activity-extra', {}), /unavailable/);
  assert.equal(a.attachSpins({ attemptsLeft: 0, canPlay: false, ticketlessStreak: 6 }, usedExtra).ticketlessStreak, 6);
  const payload = a.attachSpins({ attemptsLeft: 1, canPlay: true }, original);
  assert.equal(payload.attemptsLeft, 3); assert.equal(payload.canPlay, true);
});
test('padding and minor edits do not farm comment actions',async()=>{
  const h=harness();
  for(const text of ['а'.repeat(80),'1234567890'.repeat(10),'колл '.repeat(25),'рейз флоп колл тёрн '.repeat(6)]){
    const r=await h.comment('padding-'+text.length,text);assert.equal(r.activityAward,undefined);assert.equal(r.activityReason,'text_rules');
  }
  const original='Я бы выбрал колл на флопе, потому что у соперника здесь много блефов и слабых попаданий, которые мы пока бьём.';
  await h.comment('first',original);
  for(const [i,text] of [original+' 123',original.replace('флопе','тёрне'),original+' Ещё подумал.'].entries()){
    const r=await h.comment('copy-'+i,text);assert.equal(r.activityAward,undefined);assert.equal(r.activityReason,'similar_text');
  }
  assert.equal((await h.activity.summary(h.actor.accountId)).actions,1);
});
test('moving Poker21 between app accounts cannot reset quotas, republish a hand or reward own comments',async()=>{
  const h=harness();await h.publish('1');
  h.moveAccount('ID654321');
  assert.equal((await h.activity.summary(h.actor.accountId)).publicationsToday,1);
  await assert.rejects(h.publish('1',{id:'new-request'}),/уже опубликована/);
  const own=await h.comment('old-own',undefined,{authorId:'ID123456',authorPokerId:'123'});
  assert.equal(own.activityReason,'own_thread');assert.equal(own.activityAward,undefined);
  await h.publish('2');await h.publish('3');await h.publish('4');await h.publish('5');await h.publish('6');await h.publish('7');
  h.moveAccount('ID777777');await assert.rejects(h.publish('8'),/до 7 раздач/);
});
test('credited comment remains spent across account transfer, deletion and different text',async()=>{
  const h=harness();await h.comment('one');h.moveAccount('ID654321');
  const r=await h.comment('one','Предпочитаю сбросить на ривере: доска закрыла очевидные комбинации и оппонент редко блефует такими размерами.');
  assert.equal(r.activityAward,undefined);assert.equal(r.activityReason,'already_counted');
  assert.equal((await h.activity.summary(h.actor.accountId)).actions,0);
});
test('binding changes and lock expiry at commit reject all writes',async()=>{
  for(const mode of ['binding','lock']){
    const h=harness();h.beforeCommit(()=>mode==='binding'?h.unbind():h.locks.clear());
    await assert.rejects(h.publish());assert.equal(h.commits.length,0);
    assert.equal(h.hget('poker_app:bonus_balances',h.actor.accountId),undefined);
  }
});
test('corrupt or negative wallet fails closed',async()=>{
  const h=harness();h.values.set(h.activity.stateKey(h.actor.accountId),JSON.stringify({spinsAvailable:-1}));
  await assert.rejects(h.publish(),/invalid_activity_state/);
  assert.equal(h.commits.length,0);
});
test('no server reward data is accepted from client create/reply payloads',()=>{
  const reviews=load('lib/club-reviews.js',{'./club-social':{clean:(value,max)=>String(value||'').slice(0,max)}});
  const actor={accountId:'ID1',name:'Real author'};
  const thread=reviews.newThread({title:'Раздача',question:'Что делать в этой ситуации?',type:'hand',authorPokerId:'999',authorId:'victim',activityAward:{bonus:100000},spinsEarned:999},actor,'a'.repeat(24));
  assert.equal(thread.authorId,'ID1');assert.equal(thread.authorPokerId,undefined);assert.equal(thread.activityAward,undefined);
  const result=reviews.reply(thread,{requestId:'b'.repeat(24),text:'Нормальный ответ игрока',authorId:'victim',activityAward:{bonus:10000}},actor);
  assert.equal(result.reply.authorId,'ID1');assert.equal(result.reply.activityAward,undefined);
});
