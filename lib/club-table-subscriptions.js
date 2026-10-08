'use strict';
const {create} = require('./table-subscriptions');
const redis = require('./redis');
const {getPlayingTables} = require('./pokerplus');
const {getNicknames} = require('./live-table-nicknames');
let service;
function getService() {
  if (!service) service = create({redis,namespace:'club',getTables:getPlayingTables,getNames:getNicknames,
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
module.exports = {handle:update=>getService().handle(update),poll:()=>getService().poll()};
