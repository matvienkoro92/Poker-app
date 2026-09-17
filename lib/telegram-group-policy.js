'use strict';
const {pipeline} = require('./redis');
const KEY = 'poker_app:telegram:reply_only_groups';
const EVENT_CHAT_KEY = 'poker_app:tournament_bet:notification_chat';
async function eventChatId() {
  let id = String(process.env.TELEGRAM_TOURNAMENT_BET_CHAT_ID || '').trim();
  if (!id) {
    const rows = await pipeline([['GET',EVENT_CHAT_KEY]],{context:'tournament-bet.group-target',throwOnError:true});
    id = String(rows?.[0]?.result || '').trim();
  }
  return /^-\d+$/.test(id) ? id : '';
}
function groupMessage(update) {
  const m = update?.callback_query?.message || update?.message || update?.edited_message || update?.business_message;
  return ['group','supergroup'].includes(m?.chat?.type) ? m : null;
}
async function protectGroup(id) {
  if (!/^-\d+$/.test(String(id))) return false;
  const result = await pipeline([['SADD',KEY,String(id)]],{context:'telegram-group-policy.protect',throwOnError:true});
  return !!result;
}
async function guardedFetch(url, options = {}, scope = '') {
  if (/^https:\/\/api\.telegram\.org\/bot[^/]+\/(send|copy|forward)/.test(String(url))) {
    let chatId;
    const body = options.body;
    if (body && typeof body.get === 'function') chatId = body.get('chat_id');
    else if (typeof body === 'string' || Buffer.isBuffer(body)) {
      const text = String(body);
      try { chatId = JSON.parse(text).chat_id; } catch (_) {
        chatId = text.match(/name="chat_id"\r?\n\r?\n([^\r\n]+)/)?.[1];
      }
    }
    if (/^-\d+$/.test(String(chatId))) {
      if (((['tournament-bet','raffle-start','raffle-completed','club-review'].includes(scope) && /\/sendMessage$/.test(String(url))) ||
          (scope === 'sng-application' && /\/send(?:Message|Photo)$/.test(String(url)))) && String(chatId) === await eventChatId()) {
        return globalThis.fetch(url, options);
      }
      let blocked = true;
      try {
        const rows = await pipeline([['SISMEMBER',KEY,String(chatId)]],{context:'telegram-group-policy.check',throwOnError:true});
        blocked = !rows || Number(rows[0]?.result) !== 0;
      } catch (_) {}
      if (blocked) return {ok:false,status:403,json:async()=>({ok:false,error_code:403,description:'Group allows only pulse replies'})};
    }
  }
  return globalThis.fetch(url, options);
}
module.exports = {groupMessage,protectGroup,guardedFetch,eventChatId};
