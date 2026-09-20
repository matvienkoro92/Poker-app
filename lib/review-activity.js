"use strict";

const crypto = require('node:crypto');
const { redis } = require('./club-social');
const { atomicWrite } = require('./redis-atomic');
const {
  BONUS_BALANCES_KEY, BONUS_TOTAL_BALANCE_KEY, BONUS_BALANCE_LOCK_PREFIX,
  acquireRedisLock, releaseRedisLock, getBonusBalance,
  buildBonusLedgerEntry, bonusLedgerWriteCommands,
} = require('./bonus-ledger');

const PREFIX = 'poker_app:review_activity:';
const BONUS_EARNED_KEY = PREFIX + 'bonus_earned';
const REPORT_KEY = PREFIX + 'report_accounts';
const LIMIT = 7;
const TARGET = 5;
const TICKET_TARGET = 40;
const TICKET_AMOUNT = 300;
const DAILY_POKER_TICKET_PREFIX = 'poker_app:daily_poker_ticket:';
const DAILY_POKER_TICKETS_USER_PREFIX = 'poker_app:daily_poker_tickets_user:';
const DAILY_POKER_TICKET_COUNT_KEY = 'poker_app:daily_poker_ticket_count';
const stateKey = id => PREFIX + 'state:' + id;
const lockKey = id => PREFIX + 'lock:' + id;
const hash = value => crypto.createHash('sha256').update(String(value)).digest('hex');
const LEGACY_HAND_CHECK = `-- review-legacy-hand-check
for _, key in ipairs(KEYS) do
  local raw = redis.call('GET', key)
  if raw then
    local t = cjson.decode(raw)
    if tostring(t.authorId) == ARGV[1] and tostring(t.handId) == ARGV[2] then return 1 end
  end
end
return 0`;
function fail(message, status = 400) { const e = new Error(message); e.status = status; throw e; }
function day(now = new Date()) { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Moscow', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now); }
// A length threshold is a transparent eligibility rule, not a judgement of poker quality.
function meaningfulText(text) {
  return String(text || '').normalize('NFKC').split(/\r?\n/).filter(line => !/^\s*>/.test(line)).join(' ')
    .replace(/https?:\/\/\S+|www\.\S+|«[^»]*»|“[^”]*”|"[^"]*"/giu, '')
    .toLocaleLowerCase('ru-RU').replace(/[^\p{L}\p{N}]/gu, '');
}
function rewardText(text, minimum) {
  const normalized = meaningfulText(text);
  const words = String(text || '').normalize('NFKC').toLowerCase().match(/[\p{L}]{2,}/gu) || [];
  if (normalized.length < minimum) return '';
  // Reject trivial padding; do not pretend this establishes the quality of advice.
  if (/(.)\1{7}/u.test(normalized) || /^(.{1,60})\1{2,}$/u.test(normalized) || new Set(words).size < (minimum >= 60 ? 4 : 3)) return '';
  if ((normalized.match(/\p{L}/gu) || []).length < minimum / 2) return '';
  return normalized;
}
function similarText(a, b) {
  a = a.replace(/\p{N}/gu, ''); b = b.replace(/\p{N}/gu, '');
  if (!a || !b || Math.min(a.length,b.length) / Math.max(a.length,b.length) < .8) return false;
  if (a.includes(b) || b.includes(a)) return true;
  const grams = text => new Set(Array.from({length:Math.max(0,text.length-4)},(_,i)=>text.slice(i,i+5)));
  const aa=grams(a),bb=grams(b); let common=0; for(const part of aa)if(bb.has(part))common++;
  return 2*common / (aa.size+bb.size) >= .88;
}
function emptyState() { return { actions: 0, publicationActions: 0, commentActions: 0, legacySpinsEarned: 0, activityTicketsEarned: 0, bonusEarned: 0, spinsEarned: 0, spinsAvailable: 0, extraSpins: 0, publicationsDay: '', publicationsToday: 0, rewardTarget: TARGET }; }
async function readState(id) {
  const [raw] = await redis([['GET', stateKey(id)]]);
  return normalizeState(raw ? JSON.parse(raw) : {});
}
function normalizeState(raw) {
  const state=Object.assign(emptyState(),raw);
  const separateCountersPresent=raw&&raw.publicationActions!=null&&raw.commentActions!=null;
  for(const field of ['actions','publicationActions','commentActions','legacySpinsEarned','activityTicketsEarned','bonusEarned','spinsEarned','spinsAvailable','extraSpins','publicationsToday','spinBonusEarned','extraSpinsEarned']) {
    if(state[field] == null)state[field]=0;
    if(!Number.isSafeInteger(state[field])||state[field]<0)throw new Error('invalid_activity_state:'+field);
  }
  if(raw&&raw.rewardTarget==null){
    if(state.spinsEarned!==Math.floor(state.actions/7))throw new Error('invalid_activity_state');
    const earned=Math.floor(state.actions/TARGET),added=earned-state.spinsEarned;
    state.spinsEarned=earned;state.spinsAvailable+=added;state.rewardTarget=TARGET;
  }
  if(!separateCountersPresent){state.publicationActions=0;state.commentActions=0;state.legacySpinsEarned=state.spinsEarned;}
  const expectedSpins=state.legacySpinsEarned+Math.floor(state.publicationActions/TARGET)+Math.floor(state.commentActions/TARGET);
  if(state.rewardTarget!==TARGET||state.activityTicketsEarned>Math.floor(state.actions/TICKET_TARGET)||state.spinBonusEarned>state.bonusEarned||state.spinsAvailable>state.spinsEarned||state.spinsEarned!==expectedSpins)throw new Error('invalid_activity_state');
  return state;
}
function reportCommands(accountId,state){
  const s=normalizeState(state);
  return [['HSET',REPORT_KEY,accountId,JSON.stringify({actions:s.actions,publicationActions:s.publicationActions,commentActions:s.commentActions,legacySpinsEarned:s.legacySpinsEarned,activityTicketsEarned:s.activityTicketsEarned,bonusEarned:s.bonusEarned,
    spinBonusEarned:s.spinBonusEarned,spinsEarned:s.spinsEarned,spinsAvailable:s.spinsAvailable,
    extraSpins:s.extraSpins,extraSpinsEarned:s.extraSpinsEarned,rewardTarget:s.rewardTarget})]];
}
function publicState(state, now = new Date()) {
  return { actions: state.actions, progress: state.actions % TARGET, target: TARGET,
    publicationActions: state.publicationActions, publicationProgress: state.publicationActions % TARGET,
    commentActions: state.commentActions, commentProgress: state.commentActions % TARGET,
    ticketProgress: state.actions % TICKET_TARGET, ticketTarget: TICKET_TARGET, ticketAmount: TICKET_AMOUNT,
    activityTicketsEarned: state.activityTicketsEarned,
    bonusEarned: state.bonusEarned, publicationBonusEarned: state.bonusEarned - (state.spinBonusEarned || 0), spinBonusEarned: state.spinBonusEarned || 0, spinsEarned: state.spinsEarned,
    spinsAvailable: state.spinsAvailable + state.extraSpins,
    publicationsToday: state.publicationsDay === day(now) ? state.publicationsToday : 0,
    publicationLimit: LIMIT, timeZone: 'Europe/Moscow' };
}
async function summary(id) {
  const result=publicState(await readState(id));
  const playerId=await playerIdentity({accountId:id});
  if(playerId){
    const [raw]=await redis([['GET',PREFIX+'player_day:'+playerId]]);
    const quota=raw?JSON.parse(raw):{};
    if(quota.day===day()){
      if(!Number.isSafeInteger(quota.count)||quota.count<0)throw new Error('invalid_activity_quota');
      result.publicationsToday=Math.max(result.publicationsToday,quota.count);
    }
  }
  return result;
}
async function playerIdentity(actor) {
  const { BIND_HASH_KEY } = require('./pokerplus');
  const [bound]=await redis([['HGET',BIND_HASH_KEY,actor.accountId]]);
  const playerId = String(bound || '').trim();
  return /^\d+$/.test(playerId) ? playerId : '';
}
async function verifyHand(thread, playerId) {
  if (!/^\d+$/.test(playerId)) fail('Привяжите игровой аккаунт, чтобы публиковать раздачи');
  if (!/^\d{1,24}$/.test(thread.handId)) fail('Публикуйте раздачу из раздела «Мои раздачи»');
  const prefix = 'poker_app:starting-hands:' + playerId + ':';
  const [version] = await redis([['GET', prefix + 'active']]);
  const [exists] = version ? await redis([['HEXISTS', prefix + version, thread.handId]]) : [0];
  if (Number(exists) !== 1) fail('Эта раздача не найдена в вашей истории');
  thread.authorPokerId=playerId;
}

// Called instead of the reviews CAS. Thread, quota, separate progress counters and
// the spin wallet are committed together; retries and deletions cannot duplicate rewards.
async function commit({ thread, raw, keys, result, actor, kind }) {
  const lock = await acquireRedisLock(lockKey(actor.accountId), 15);
  if (!lock) fail('Действие уже выполняется. Попробуйте через несколько секунд.', 409);
  let playerLock;
  let bonusLock;
  try {
    const [current] = await redis([['GET', keys[0]]]);
    if ((current || '') !== raw) return false;
    const state = await readState(actor.accountId);
    const commands = [];
    const balances = [];
    const guards = [{ key: keys[0], value: raw },
      { key: 'poker_app:account_redirects', field: actor.accountId, value: '' }];
    const playerId=await playerIdentity(actor);
    if(playerId){
      playerLock=await acquireRedisLock(PREFIX+'player_lock:'+playerId,15);
      if(!playerLock)fail('Активность игрового аккаунта уже обновляется. Попробуйте ещё раз.',409);
      const {BIND_HASH_KEY}=require('./pokerplus');
      guards.push({key:BIND_HASH_KEY,field:actor.accountId,value:playerId});
    }
    let credited = false, marker = '', textMarker = '';
    if (kind === 'create' && thread.type === 'hand') {
      if (!rewardText(thread.question,20)) fail('Добавьте вопрос к раздаче: минимум 20 букв или цифр, без цитат, ссылок и бессмысленных повторов');
      await verifyHand(thread, playerId);
      const today = day();
      if (state.publicationsDay !== today) { state.publicationsDay = today; state.publicationsToday = 0; }
      const quotaKey=PREFIX+'player_day:'+playerId;
      const [quotaRaw]=await redis([['GET',quotaKey]]);
      const quota=quotaRaw?JSON.parse(quotaRaw):{};
      const used=Math.max(state.publicationsToday,quota.day===today?Number(quota.count):0);
      if(!Number.isSafeInteger(used)||used<0)throw new Error('invalid_activity_quota');
      if (used >= LIMIT) fail('Можно опубликовать до 7 раздач в день. Лимит обновится в 00:00 МСК.', 429);
      marker = PREFIX + 'hand:' + actor.accountId + ':' + thread.handId;
      const playerMarker=PREFIX+'player_hand:'+playerId+':'+thread.handId;
      const published = await redis([['GET', marker],['GET',playerMarker]]);
      if (published.some(Boolean)) fail('Эта раздача уже опубликована. Повторная публикация не нужна.', 409);
      // Old threads predate reward markers. Check their metadata inside Redis so
      // screenshots and long hand histories are not downloaded just for this check.
      const scanStarted=Date.now();
      for (let offset = 0; ; offset += 50) {
        if(offset>=10000||Date.now()-scanStarted>7000)fail('Проверка истории заняла слишком долго. Попробуйте ещё раз.',503);
        const [ids] = await redis([['ZREVRANGE', 'poker_app:reviews:mine:' + actor.accountId, offset, offset + 49]]);
        if (!ids || !ids.length) break;
        const [exists] = await redis([['EVAL', LEGACY_HAND_CHECK, ids.length, ...ids.map(id => 'poker_app:reviews:thread:' + id), actor.accountId, thread.handId]]);
        if (Number(exists) === 1) fail('Эта раздача уже опубликована. Повторная публикация не нужна.', 409);
        if (ids.length < 50) break;
      }
      state.publicationsToday=used+1;
      commands.push(['SET',playerMarker,thread.id],['SET',quotaKey,JSON.stringify({day:today,count:used+1})]);
      credited = true;
    } else if (kind === 'reply' && result && result.fresh && thread.type === 'hand') {
      const reply=result.reply;
      const authorPokerId=thread.authorPokerId||await playerIdentity({accountId:thread.authorId});
      const own=thread.authorId===actor.accountId||playerId&&authorPokerId===playerId;
      const text=rewardText(reply.text,20);
      reply.activityReason=own?'own_thread':!playerId?'unlinked':!authorPokerId?'author_unlinked':!text?'text_rules':'already_counted';
      if(!own&&playerId&&authorPokerId&&text){
        marker = PREFIX + 'comment:' + actor.accountId + ':' + thread.id;
        textMarker = PREFIX + 'text:' + actor.accountId + ':' + hash(text);
        const playerMarker=PREFIX+'player_comment:'+playerId+':'+thread.id;
        const canonicalMarker=PREFIX+'player_text:'+playerId+':'+hash(text.replace(/\p{N}/gu,''));
        const accountCanonicalMarker=PREFIX+'account_text:'+actor.accountId+':'+hash(text.replace(/\p{N}/gu,''));
        const previous = await redis([['GET', marker], ['GET', textMarker],['GET',playerMarker],['GET',canonicalMarker],['GET',accountCanonicalMarker]]);
        if(previous.every(value=>!value)){
          const recentKey=PREFIX+'recent_text:'+playerId;
          const accountRecentKey=PREFIX+'account_recent_text:'+actor.accountId;
          const recent=await redis([['LRANGE',recentKey,0,99],['LRANGE',accountRecentKey,0,99]]);
          credited=!recent.flat().some(old=>similarText(text,old));
          if(credited)commands.push(['SET',playerMarker,reply.id],['SET',canonicalMarker,reply.id],['SET',accountCanonicalMarker,reply.id],['LPUSH',recentKey,text],['LTRIM',recentKey,0,99],['LPUSH',accountRecentKey,text],['LTRIM',accountRecentKey,0,99]);
          else reply.activityReason='similar_text';
        }else if(previous[1]||previous[3]||previous[4])reply.activityReason='similar_text';
      }
      if(credited)delete reply.activityReason;
    }
    if (credited) {
      state.actions++;
      const counterField=kind==='create'?'publicationActions':'commentActions';
      state[counterField]++;
      const spin = state[counterField] % TARGET === 0;
      if (spin) { state.spinsEarned++; state.spinsAvailable++; }
      const ticketsDue=Math.floor(state.actions/TICKET_TARGET)-state.activityTicketsEarned;
      let ticketAwarded=0;
      if(ticketsDue>0){
        bonusLock=await acquireRedisLock(BONUS_BALANCE_LOCK_PREFIX+actor.accountId,15);
        if(!bonusLock)fail('Бонусный баланс обновляется. Попробуйте ещё раз.',409);
        let balance=await getBonusBalance(actor.accountId);
        balances.push({key:BONUS_BALANCES_KEY,userId:actor.accountId,value:balance});
        const nowIso=new Date().toISOString();
        for(let i=0;i<ticketsDue;i++){
          const milestone=state.activityTicketsEarned+i+1;
          const ticketId='review_activity_'+hash(actor.accountId+':'+milestone).slice(0,24);
          const ledger=buildBonusLedgerEntry({id:'bonus_'+ticketId,userId:actor.accountId,amount:TICKET_AMOUNT,direction:'credit',operationType:'promo_ticket',balanceBefore:balance,source:'review_activity_ticket',sourceId:ticketId,comment:'Бонус-билет 300 ₽ за 40 активных действий',createdAt:nowIso});
          balance=ledger.balance_after;
          commands.push(...bonusLedgerWriteCommands(ledger));
          const ticket={id:ticketId,user_id:actor.accountId,source:'review_activity',source_id:'actions_'+String(milestone*TICKET_TARGET),amount:TICKET_AMOUNT,title:'Бонус-билет за 300 ₽ за 40 активных действий',status:'issued',created_at:nowIso};
          commands.push(['SET',DAILY_POKER_TICKET_PREFIX+ticketId,JSON.stringify(ticket)],['LPUSH',DAILY_POKER_TICKETS_USER_PREFIX+actor.accountId,ticketId],['HINCRBY',DAILY_POKER_TICKET_COUNT_KEY,actor.accountId,'1']);
        }
        state.activityTicketsEarned+=ticketsDue;
        ticketAwarded=ticketsDue;
      }
      commands.push(['SET', marker, thread.id]);
      if (textMarker) commands.push(['SET', textMarker, result.reply.id]);
      const award = { action: true, bonus: ticketAwarded*TICKET_AMOUNT, ticket: ticketAwarded, spin: spin ? 1 : 0 };
      if (kind === 'create') thread.activityAward = award;
      else result.reply.activityAward = award;
      commands.push(['SET', stateKey(actor.accountId), JSON.stringify(normalizeState(state))],...reportCommands(actor.accountId,state));
    }
    commands.push(['SET', keys[0], JSON.stringify(thread)], ...keys.slice(1).map(key => ['ZADD', key, Date.parse(thread.updatedAt), thread.id]));
    try {
      await atomicWrite(commands, { locks: [lock, playerLock, bonusLock], values: guards,
        balances, totalKey: bonusLock?BONUS_TOTAL_BALANCE_KEY:'', balanceKey: bonusLock?BONUS_BALANCES_KEY:'', context: 'review-activity.commit' });
      return true;
    } catch (e) { if (/value_changed/.test(e.message)) return false; throw e; }
  } finally { if(bonusLock)await releaseRedisLock(bonusLock); if(playerLock)await releaseRedisLock(playerLock); await releaseRedisLock(lock); }
}

function attachSpins(payload, state) {
  const activity = publicState(state);
  payload.activity = activity;
  payload.attemptsLeft = (Number(payload.attemptsLeft) || 0) + activity.spinsAvailable;
  payload.canPlay = !!payload.canPlay || activity.spinsAvailable > 0;
  return payload;
}
function spendSpin(state, attemptType, reward) {
  const next = Object.assign({}, state);
  const field = attemptType === 'activity-extra' ? 'extraSpins' : 'spinsAvailable';
  if (!(next[field] > 0)) throw new Error('activity_spin_unavailable');
  next[field]--;
  if (attemptType === 'activity' && reward.grantsExtraAttempt) { next.extraSpins++; next.extraSpinsEarned=(next.extraSpinsEarned||0)+1; }
  return next;
}
module.exports = { PREFIX, BONUS_EARNED_KEY, REPORT_KEY, reportCommands, LIMIT, TARGET, TICKET_TARGET, TICKET_AMOUNT, stateKey, lockKey, meaningfulText, day, emptyState,
  readState, publicState, summary, commit, attachSpins, spendSpin, rewardText, similarText, normalizeState };
