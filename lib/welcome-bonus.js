'use strict';

const {createHash} = require('node:crypto');
const redis = require('./redis');
const {normalizeRaffleDeviceId} = require('./raffle-core');
const accounts = require('./account-id');
const ledger = require('./bonus-ledger');
const {atomicWrite} = require('./redis-atomic');
const activity = require('./review-activity');
const {BIND_HASH_KEY, BIND_AT_HASH_KEY, UNBIND_AT_HASH_KEY, FIRST_BIND_AT_HASH_KEY} = require('./pokerplus');
const {playersGroup, membership, INVITE} = require('./tracking-link-milestones');
const {telegramChannelSubscriptionStatus, requiredChannelHandle, requiredBotHandle, telegramHandleUrl} = require('./telegram-participation-gate');

const amount = 300;
const spinCount = 3;
const botStarts = 'poker_app:welcome_bot_started';
const active = () => Number.isFinite(launchAt) && Date.now() >= launchAt;
const claims = 'poker_app:welcome_bonus_claims:v1';
const launchAt = Date.parse(process.env.WELCOME_BONUS_START_AT || '2026-11-01T00:00:00+07:00');

async function read(commands) {
  const rows = await redis.pipeline(commands, {throwOnError: true});
  if (!rows || rows.length !== commands.length || rows.some(row => row.error)) throw Error('Welcome bonus storage unavailable');
  return rows.map(row => row.result);
}

async function run(accountId, auth, token, claim, rawDeviceId) {
  if (!active()) return {available:false};
  const primary = await accounts.getUserIdByDtId(accountId);
  const aliases = await redis.sscanall('poker_app:account_users:' + accountId, {count:100,maxPages:10,context:'welcome-bonus'});
  if (!aliases) throw Error('Welcome bonus identities unavailable');
  const subjects = [...new Set([accountId, auth.memberId, primary, ...aliases].filter(Boolean))];
  const dates = await read(subjects.flatMap(id => [
    ['HGET','poker_app:telegram_login_at',id], ['HGET','poker_app:email_linked_at',id],
  ]));
  const registeredAt = Math.min(...dates.map(Number).filter(value => value > 0));
  if (!Number.isFinite(registeredAt) || registeredAt < launchAt || registeredAt > Date.now()) return {available:false};

  const telegramId = /^tg_([1-9]\d*)$/.exec(String(auth.memberId))?.[1];
  if (!telegramId) return {available:false};
  const [binding, boundAt, previous, previousTelegram] = await read([
    ['HGET',BIND_HASH_KEY,accountId], ['HGET',BIND_AT_HASH_KEY,accountId], ['HGET',claims,accountId], ['HGET',claims,'telegram:'+telegramId],
  ]);
  const priorUnbinds = await read(subjects.map(id => ['HGET',UNBIND_AT_HASH_KEY,id]));
  if ((binding && !(Number(boundAt) >= launchAt)) ||
      priorUnbinds.some(value => Number(value) > 0 && Number(value) < launchAt)) return {available:false};
  const profile = await require('./club-social').memberProfile(accountId);
  if (profile.level > 1) return {available:false};
  const channel = requiredChannelHandle();
  const steps = [
    {id:"register", label:"Зарегистрироваться", spins:1, raffleAccess:true},
    {id:'chat', label:'Вступить в чат', url:INVITE, spins:spinCount},
    {id:'channel', label:'Подписаться на канал', url:telegramHandleUrl(channel), spins:spinCount},
    {id:'bot', label:'Запустить бота', url:telegramHandleUrl(requiredBotHandle()) + '?start=welcome_bonus', spins:spinCount},
    {id:'poker', label:'Привязать Poker21', amount},
  ];
  const fieldsFor = step => [accountId, telegramId].map((id,index) => step.id + ':' + (index ? 'telegram:' : 'account:') + id);
  const allFields = steps.flatMap(fieldsFor);
  const earned = new Set((await read(allFields.map(field => ['HGET',claims,field]))).flatMap((value,index) => value ? [allFields[index]] : []));
  const poker = steps[4];
  const pokerField = binding && 'poker21:' + String(binding).toLowerCase();
  let pokerEligible = false;
  if (pokerField) {
    const [firstBoundAt, used] = await read([
      ['HGET',FIRST_BIND_AT_HASH_KEY,String(binding).toLowerCase()], ['HGET',claims,pokerField],
    ]);
    if (previous || previousTelegram || used) earned.add(fieldsFor(poker)[0]);
    pokerEligible = profile.level === 1 && Number(firstBoundAt || boundAt) >= launchAt;
    poker.unavailable = !pokerEligible && !fieldsFor(poker).some(field => earned.has(field));
  }
  if (previous || previousTelegram) earned.add(fieldsFor(poker)[0]);
  const done = step => fieldsFor(step).some(field => earned.has(field));
  const next = () => steps.find(step => !done(step));
  const status = () => ({available:!!next() && !next().unavailable,
    steps:steps.map(step => ({...step, claimed:done(step), locked:!done(step) && step !== next()}))});
  const step = next();
  if (!claim || !step || step.unavailable) return status();

  const deviceId = normalizeRaffleDeviceId(rawDeviceId);
  if (!deviceId) return {...status(),message:'Не удалось определить браузер. Откройте приложение заново.'};
  const deviceField = 'browser:' + createHash('sha256').update(deviceId).digest('hex');
  const [deviceOwner] = await read([['HGET',claims,deviceField]]);
  const browserUsed = () => ({...status(),message:'Вы уже получали бонус'});
  if (deviceOwner && deviceOwner !== telegramId) return browserUsed();

  let verified;
  switch (step.id) {
    case 'register':
      verified = true;
      break;
    case 'chat': {
      const group = await playersGroup().catch(() => null);
      verified = token && group ? await fetch('https://api.telegram.org/bot'+token+'/getChatMember',{
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({chat_id:group,user_id:telegramId}), signal:AbortSignal.timeout(6000),
      }).then(response => response.json()).then(result => result.ok ? membership(result.result) : null).catch(() => null) : null;
      break;
    }
    case 'channel':
      verified = token ? await telegramChannelSubscriptionStatus(telegramId,token,channel).catch(() => null) : null;
      break;
    case 'bot':
      verified = await read([['HEXISTS',botStarts,telegramId]]).then(([exists]) => Number(exists) === 1).catch(() => null);
      break;
    case 'poker':
      verified = pokerEligible;
      break;
  }
  if (verified !== true) return {...status(),message:verified == null
    ? 'Не удалось проверить шаг. Попробуйте ещё раз.'
    : 'Выполните текущий шаг и повторите проверку.'};
  const cashAward = step === poker;
  const messages = [];

  const locks = [];
  const commands = [];
  const values = [{key:'poker_app:account_redirects',field:accountId,value:''}];
  const balances = [];
  const fields = fieldsFor(step);
  if (cashAward) fields.push(accountId,pokerField,'telegram:'+telegramId);
  values.push({key:claims,field:deviceField,value:deviceOwner || ''});
  values.push(...fields.map(field => ({key:claims,field,value:''})));
  let entry;
  try {
    if (step.spins) {
      const lock = await ledger.acquireRedisLock(activity.lockKey(accountId), 12);
      if (!lock) return {...status(),message:'Попробуйте ещё раз через несколько секунд.'};
      locks.push(lock);
      const state = await activity.readState(accountId);
      state.welcomeSpins += step.spins;
      commands.push(['SET',activity.stateKey(accountId),JSON.stringify(state)], ...activity.reportCommands(accountId,state));
    }
    if (cashAward) {
      const lock = await ledger.acquireRedisLock(ledger.BONUS_BALANCE_LOCK_PREFIX + accountId, 10);
      if (!lock) return {...status(),message:'Попробуйте ещё раз через несколько секунд.'};
      locks.push(lock);
      const balanceBefore = await ledger.getBonusBalance(accountId);
      entry = ledger.buildBonusLedgerEntry({userId:accountId,amount,balanceBefore,
        operationType:'promo_reward',source:'welcome_bonus',comment:'Бонус за привязку Poker21'});
      commands.push(...ledger.bonusLedgerWriteCommands(entry));
      values.push({key:BIND_HASH_KEY,field:accountId,value:String(binding)},
        {key:BIND_AT_HASH_KEY,field:accountId,value:String(boundAt)});
      balances.push({key:ledger.BONUS_BALANCES_KEY,userId:accountId,value:balanceBefore});
    }
    const awardedAt = new Date().toISOString();
    commands.push(['HSET',claims,deviceField,telegramId,
      ...fields.flatMap(field => [field,field === fields[0] ? awardedAt : accountId])]);
    await atomicWrite(commands,{
      locks, values, balances,
      ...(entry ? {totalKey:ledger.BONUS_TOTAL_BALANCE_KEY,balanceKey:ledger.BONUS_BALANCES_KEY} : {}),
      context:'welcome-bonus.claim',
    });
    fields.forEach(field => earned.add(field));
    if (step.spins) messages.push('Начислено круток: ' + step.spins + '.');
    if (entry) messages.push('300 ₽ начислены на бонусный баланс.');
    return {...status(),message:messages.join(' '),...(entry ? {bonusBalance:entry.balance_after} : {})};
  } finally {
    for (const lock of locks.reverse()) await ledger.releaseRedisLock(lock);
  }
}

async function adminReport({start=0,end=Infinity} = {}) {
  const records = await redis.hscanall(claims, {count:500, maxPages:100, context:'welcome-bonus.report'});
  if (records == null) return {available:false};
  const counts = {register:0, chat:0, channel:0, bot:0, poker:0};
  let undated = 0;
  for (const [field,value] of Object.entries(records)) {
    // Each award has an account marker and a Telegram marker. Count it once.
    const match = /^(register|chat|channel|bot|poker):account:/.exec(field);
    if (!match) continue;
    const at = typeof value === "string" && value.includes("T") ? Date.parse(value) : NaN;
    if (!Number.isFinite(at)) {
      undated++;
      if (start === 0) counts[match[1]]++;
    } else if (at >= start && at <= end) counts[match[1]]++;
  }
  return {available:true, counts, undated,
    spinBonuses:counts.register + counts.chat + counts.channel + counts.bot,
    bonusRubles:amount * counts.poker};
}

module.exports = {run, active, adminReport};
