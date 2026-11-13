'use strict';
const {pipeline} = require('./redis');
const isGameRatingAction=action=>/^rating:(chess|billiards|long|short)(?::(paid|free))?$/.test(String(action||''));
const isGroupScheduleCommand=update=>/^\/(?:schedule|расписание)(?:@Poker_dvatuza_bot)?$/i.test(String((update?.message||update?.business_message)?.text||'').trim());
function isPaymentLinkGroup(id){const target=String(process.env.PRODAMUS_WITHDRAWALS_CHAT_ID||'').trim();return /^-\d+$/.test(target)&&String(id)===target;}
function paymentLinkCommandAmount(update){
  const m=update?.message||update?.business_message;
  if(!['group','supergroup'].includes(m?.chat?.type))return null;
  const match=String(m.text||'').trim().match(/^\/?ссылка(?:@Poker_dvatuza_bot)?\s+(1000|1500|2000)$/i);
  return match?Number(match[1])*100:null;
}
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
  const m = update?.callback_query?.message || update?.message || update?.edited_message ||
    update?.business_message || update?.edited_business_message || update?.my_chat_member ||
    update?.chat_member || update?.chat_join_request || update?.message_reaction || update?.message_reaction_count;
  return ['group','supergroup'].includes(m?.chat?.type) ? m : null;
}
async function protectGroup(id) {
  if (!/^-\d+$/.test(String(id))) return false;
  const result = await pipeline([['SADD',KEY,String(id)]],{context:'telegram-group-policy.protect',throwOnError:true});
  return !!result;
}
async function guardedFetch(url, options = {}, scope = '') {
  if(scope==='support-dialog'){
    let body;try{body=JSON.parse(String(options.body||''));}catch{return {ok:false,status:403,json:async()=>({ok:false})};}
    const cfg=await require('./telegram-support-config').config();
    const method=String(url).match(/^https:\/\/api\.telegram\.org\/bot[^/]+\/(\w+)$/)?.[1];
    const target=cfg?.enabled&&String(cfg.chatId);
    const group=target&&String(body.chat_id)===target;
    const privateId=id=>/^[1-9]\d*$/.test(String(id||''));
    let knownLead=false;
    let knownTopic=false;
    let knownQueueMessage=false;
    if(group&&['editMessageText','pinChatMessage'].includes(method)&&Number.isSafeInteger(body.message_id)){
      const [row]=await pipeline([['GET','poker_app:telegram:support:v1:queue-board:'+target]],{throwOnError:true,context:'support.queue-policy'});
      try{knownQueueMessage=JSON.parse(row?.result||'null')?.messageId===body.message_id;}catch{}
    }
    let approvedServiceDeletion=false;
    if(group&&method==='deleteMessage'&&Number.isSafeInteger(body.message_id)&&body.message_id>0){
      const [receipt]=await pipeline([['GET','poker_app:telegram:support:v1:service-delete:'+target+':'+body.message_id]],{throwOnError:true,context:'support.service-delete-policy'});
      if(/^[1-9]\d*$/.test(String(receipt?.result||''))){
        const [topic]=await pipeline([['GET','poker_app:telegram:support:v1:topic:'+target+':'+receipt.result]],{throwOnError:true,context:'support.service-topic-policy'});
        approvedServiceDeletion=privateId(topic?.result);
      }
      if(!approvedServiceDeletion){
        const [permit]=await pipeline([['GET','poker_app:telegram:support:v1:amount-notice-delete:'+target+':'+body.message_id]],{throwOnError:true,context:'support.amount-notice-policy'});
        if(privateId(permit?.result)){
          const [row]=await pipeline([['GET','poker_app:telegram:support:v1:client:'+target+':'+permit.result]],{throwOnError:true,context:'support.amount-notice-client'});
          try{const client=JSON.parse(row?.result||'null');approvedServiceDeletion=client?.awaitingAmountNotice?.messageId===body.message_id&&String(client.id)===String(permit.result);}catch{}
        }
      }
    }
    if(group&&method==='editForumTopic'&&Number.isSafeInteger(body.message_thread_id)&&body.message_thread_id>0){
      const [row]=await pipeline([['GET','poker_app:telegram:support:v1:topic:'+target+':'+body.message_thread_id]],{throwOnError:true,context:'support.topic-status'});
      knownTopic=privateId(row?.result);
    }
    if(target&&method==='sendMessage'&&privateId(body.chat_id)){
      const [row]=await pipeline([['GET','poker_app:telegram:support:v1:client:'+target+':'+body.chat_id]],{throwOnError:true,context:'support.recipient'});
      try{knownLead=String(JSON.parse(row?.result||'null')?.id)===String(body.chat_id);}catch{}
    }
    let knownReaction=false;
    if(target&&method==='setMessageReaction'&&privateId(body.chat_id)&&Number.isSafeInteger(body.message_id)&&body.message_id>0){
      const [row]=await pipeline([['GET','poker_app:telegram:support:v1:reaction-target:'+target+':'+body.chat_id+':'+body.message_id]],{throwOnError:true,context:'support.reaction-policy'});
      knownReaction=!!row?.result&&Array.isArray(body.reaction)&&body.reaction.length<=1&&body.reaction.every(r=>r.type==='emoji'&&typeof r.emoji==='string');
    }
    const allowed=target&&(
      (method==='setMessageReaction'&&knownReaction)||
      (method==='createForumTopic'&&group)||
      (method==='editForumTopic'&&group&&knownTopic)||
      (['editMessageText','pinChatMessage'].includes(method)&&group&&knownQueueMessage)||
      (method==='deleteMessage'&&group&&approvedServiceDeletion)||
      (method==='sendMessage'&&(group||knownLead))||
      (method==='answerCallbackQuery'&&typeof body.callback_query_id==='string')||
      (method==='copyMessage'&&((group&&privateId(body.from_chat_id)&&Number.isSafeInteger(body.message_thread_id))||(privateId(body.chat_id)&&String(body.from_chat_id)===target)))
    );
    if(!allowed)return {ok:false,status:403,json:async()=>({ok:false})};
    return globalThis.fetch(url,options);
  }
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
    if(scope==='payment-link-command'){
      if(!isPaymentLinkGroup(chatId)||!String(url).endsWith('/sendMessage'))return {ok:false,status:403};
      return globalThis.fetch(url,options);
    }
    if(scope==='robokassa-payment'){
      const target=process.env.ROBOKASSA_WITHDRAWALS_CHAT_ID||process.env.PRODAMUS_WITHDRAWALS_CHAT_ID||'';
      if(!/^-\d+$/.test(String(chatId))||String(chatId)!==target||!String(url).endsWith('/sendMessage'))return {ok:false,status:403};
      return globalThis.fetch(url,options);
    }
    if(scope==='nards-tournament-start'){
      if(!/^-\d+$/.test(String(chatId))||String(chatId)!==String(await require('./tracking-link-milestones').playersGroup())||!String(url).endsWith('/sendPhoto'))return {ok:false,status:403};
      return globalThis.fetch(url,options);
    }
    if (scope === 'nards-tournament' || scope === 'nards-jackpot') {
      const target = /^-\d+$/.test(String(chatId)) && String(chatId) === String(await require('./tracking-link-milestones').playersGroup());
      if (!target || !/\/sendMessage$/.test(String(url))) return {ok:false,status:403};
      return globalThis.fetch(url,options);
    }
    if (/^-\d+$/.test(String(chatId))) {
      if(['board-games-challenge','billiards-challenge'].includes(scope)&&/\/sendPhoto$/.test(String(url))&&String(chatId)===String(await require('./tracking-link-milestones').playersGroup()))return globalThis.fetch(url,options);
      if(['billiards-challenge','billiards-challenge-accepted','board-games-challenge','board-games-challenge-accepted','game-result'].includes(scope)&&/\/sendMessage$/.test(String(url))&&String(chatId)===String(await require('./tracking-link-milestones').playersGroup()))return globalThis.fetch(url,options);
      if (((['tournament-bet','raffle-start','raffle-completed','club-review','cooler-record','cooler-winner'].includes(scope) && (/\/sendMessage$/.test(String(url)) || (scope === 'raffle-completed' && /\/editMessageText$/.test(String(url))))) ||
          (['sng-application','raffle-start'].includes(scope) && /\/send(?:Message|Photo)$/.test(String(url)))) && String(chatId) === await eventChatId()) {
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
module.exports = {isPaymentLinkGroup,paymentLinkCommandAmount,isGameRatingAction,isGroupScheduleCommand,groupMessage,protectGroup,guardedFetch,eventChatId};
