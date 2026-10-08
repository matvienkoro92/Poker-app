'use strict';
const redis=require('./redis');
const {create}=require('./table-subscriptions');
const {getPlayingTables}=require('./pokerplus');
const POKERPLUS_BIND_HASH_KEY='poker_app:pokerplus_user_ids';
let service;
async function telegramId(account) {
  const rows=await redis.pipeline([['SMEMBERS','poker_app:account_users:'+account]],{throwOnError:true});
  const ids=rows?.[0]?.result || [];
  const direct=await require('./account-id').getUserIdByDtId(account);
  if(direct) ids.push(direct);
  const found=ids.find(id=>/^tg_\d+$/.test(id));
  return found ? found.slice(3) : '';
}
function getService() {
  if(!service) service=create({redis,namespace:'friends',getTables:async()=>{const rows=await redis.pipeline([['GET','poker21:table-subscriptions:coordinator:state']],{throwOnError:true});const state=rows?.[0]?.result ? JSON.parse(rows[0].result) : null;return state?.tables || await getPlayingTables();},getNames:async()=>new Map(),pollBudgetMs:18000,
    beforeDelivery:async(owner,sub)=>{
      const rows=await redis.pipeline([['SISMEMBER','poker_app:friendships:'+owner,sub.friendAccountId],['HGET',POKERPLUS_BIND_HASH_KEY,sub.friendAccountId]],{throwOnError:true});
      return Number(rows?.[0]?.result)===1 && String(rows?.[1]?.result)===sub.playerId && !(await require('./app-user-blocks').isAppUserBlocked(owner)).blocked;
    },
    send:async(method,body)=>{
      if(method!=='sendMessage') throw new Error('Unsupported friend alert method');
      const owner=body.chat_id;
      const sub=(await getService().list(owner)).find(s=>s.friendAccountId===body.friendAccountId);
      if(!sub) return {ok:true};
      const text=body.text.replace(/<[^>]*>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
      const chatId=await telegramId(owner);
      const token=process.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_TOKEN || process.env.BOT_TOKEN;
      // A user without a reachable bot can still receive app push notifications.
      if(sub.botEnabled !== false && chatId && token) {
        try {
          const response=await fetch('https://api.telegram.org/bot'+token+'/sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(8000),body:JSON.stringify({chat_id:chatId,text:body.text,parse_mode:'HTML'})});
          const result=await response.json();
          if(!result.ok) console.error('[friend-table-alerts] Bot delivery unavailable',result.error_code);
        } catch { console.error('[friend-table-alerts] Bot delivery failed'); }
      }
      try { if(sub.pushEnabled !== false) await require('./chat-webpush-notify').sendToMemberDevices(owner,{title:'Друг сел за кеш-стол',body:text,kind:'friend_table',tag:'friend-table-'+owner,openUrl:'./?startapp=profile_friends'}); }
      catch { console.error('[friend-table-alerts] App push failed'); }
      return {ok:true};
    }});
  return service;
}
async function set(owner,friend,enabled,channel) {
  const previous=(await getService().list(owner)).find(s=>s.friendAccountId===friend);
  const flags={botEnabled:channel ? !!previous && previous.botEnabled !== false : enabled,pushEnabled:channel ? !!previous && previous.pushEnabled !== false : enabled};
  if(channel) flags[channel==='bot' ? 'botEnabled' : 'pushEnabled']=enabled;
  const active=flags.botEnabled || flags.pushEnabled;
  const rows=await redis.pipeline([['HGET',POKERPLUS_BIND_HASH_KEY,friend]],{throwOnError:true});
  const playerId=rows?.[0]?.result;
  const names=active ? await require('./live-table-nicknames').getNicknames() : new Map();
  return getService().setFriend(owner,{accountId:friend,playerId,nick:names.get(String(playerId)),...flags},active);
}
async function statuses(owner) {
  const subs=await getService().list(owner);
  return new Map(subs.map(sub=>[sub.friendAccountId,{bot:sub.botEnabled !== false,push:sub.pushEnabled !== false}]));
}
module.exports={set,statuses,poll:(tables,interests)=>getService().poll(tables,interests)};
