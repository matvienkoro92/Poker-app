'use strict';
const {randomUUID} = require('node:crypto');
const {PENDING_KEY} = require('./raffle-cash-seating');
const TIMER_KEY = 'poker_app:raffle_cash_poll_timer:v1';
const releaseScript = "if redis.call('GET',KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end";
function createCashPoll({redis, publish = fetch, env = process.env}) {
  async function run(commands) {
    const rows = await redis(commands, {throwOnError:true,context:'raffle-cash-poll'});
    if (!rows || rows.some(row=>row.error)) throw new Error('Cash poll storage unavailable');
    return rows;
  }
  async function pending() { return Number((await run([['SCARD',PENDING_KEY]]))[0]?.result) > 0; }
  async function consume(token) {
    if (token) await run([['EVAL',releaseScript,'1',TIMER_KEY,token]]);
  }
  async function schedule() {
    if (!await pending()) return {scheduled:false};
    const base = [env.APP_URL,env.MINI_APP_URL,env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + env.VERCEL_PROJECT_PRODUCTION_URL,env.VERCEL_URL && 'https://' + env.VERCEL_URL]
      .find(value=>/^https?:\/\//.test(value || '') && !/^https?:\/\/t\.me\//.test(value));
    if (!base || !env.QSTASH_TOKEN || !env.CRON_SECRET) throw new Error('QStash cash poll is not configured');
    const token = randomUUID();
    if ((await run([['SET',TIMER_KEY,token,'NX','EX','90']]))[0]?.result !== 'OK') return {scheduled:false,alreadyScheduled:true};
    try {
      const destination = base.replace(/\/$/,'') + '/api/cron-table-subscriptions?cashPoll=' + token;
      const response = await publish((env.QSTASH_URL || 'https://qstash.upstash.io').replace(/\/$/,'') + '/v2/publish/' + encodeURIComponent(destination), {
        method:'POST',headers:{Authorization:'Bearer '+env.QSTASH_TOKEN,'Content-Type':'application/json',
          'Upstash-Delay':'30s','Upstash-Deduplication-Id':token,'Upstash-Forward-X-Cron-Secret':env.CRON_SECRET},
        body:'{}',signal:AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error('Cash poll scheduling failed');
      return {scheduled:true};
    } catch (error) { await consume(token); throw error; }
  }
  return {pending,consume,schedule};
}
let instance;
function cashPoll() { return instance || (instance=createCashPoll({redis:require('./redis').pipeline})); }
module.exports = {createCashPoll,cashPoll,TIMER_KEY};
