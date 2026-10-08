'use strict';
const {create} = require('./table-subscriptions');
const redis = require('./redis');
const {getPlayingTables} = require('./pokerplus');
const {getNicknames} = require('./live-table-nicknames');
const idle = require('./telegram-club-menu-idle');
let service;
function getService() {
  if (!service) service = create({redis,namespace:'club',pollBudgetMs:18000,getTables:getPlayingTables,getNames:getNicknames,push:require('./table-subscription-push').defaultService(),
    send:async(method,body)=>{
      const token = process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
      if (!token) throw new Error('Bot token missing');
      const response = await fetch('https://api.telegram.org/bot'+token+'/'+method,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(8000)});
      const data = await response.json();
      if (!data.ok && method !== 'sendMessage') throw new Error('Telegram request failed');
      return data;
    }});
  return service;
}
async function handle(update) {
  const cb = update.callback_query, message = cb?.message;
  if (redis.isConfigured() && ['group','supergroup'].includes(message?.chat?.type) && String(cb.data || '').startsWith('club:sub:')) {
    return idle.withLock(idle.idFor(message), async () => {
      const handled = await getService().handle(update);
      if (handled) await idle.arm(message, 'sub:menu');
      return handled;
    });
  }
  return getService().handle(update);
}
async function poll(tables,interests) {
  const friends=await require('./friend-table-alerts').poll(tables,interests);
  if(!friends?.complete) return {sent:friends?.sent || 0,complete:false};
  const club=await getService().poll(tables,interests);
  return {...club,sent:(club?.sent || 0)+(friends?.sent || 0)};
}
module.exports = {handle,poll,expire:()=>getService().expire()};
