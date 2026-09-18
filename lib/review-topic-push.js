'use strict';
const SUBSCRIBERS_KEY = 'poker_app:review_topic_push_subscribers';
function createService(deps) {
  const preferences = require('./raffle-tournament-push').createTournamentPushService({...deps, subscribersKey:SUBSCRIBERS_KEY});
  async function notifyCreated(thread) {
    if (!thread || !thread.id || thread.deleted) return;
    const rows = await deps.redisPipeline([['SMEMBERS',SUBSCRIBERS_KEY]]);
    if (!rows || !rows[0] || rows[0].error || !Array.isArray(rows[0].result)) throw new Error('Cannot read review push subscribers');
    const ids = [...new Set(rows[0].result)].filter(id=>/^ID\d{6}$/.test(id)&&id!==thread.authorId);
    for(let offset=0;offset<ids.length;offset+=10){
      const results=await Promise.allSettled(ids.slice(offset,offset+10).map(async id=>{
        const current=await preferences.status(id);
        if(!current.subscribed||!current.notificationsEnabled||!current.hasSubscription||!current.pushConfigured)return;
        await deps.sendToMemberDevices(id,{
          title:'Новая тема в разборах',
          body:((thread.authorNick||'Игрок')+' · '+(thread.question||thread.title||'Новая раздача')).replace(/\s+/g,' ').slice(0,180),
          kind:'club_review',tag:'review-topic-'+thread.id,openUrl:'./?startapp=review_'+encodeURIComponent(thread.id),
          dedupeKey:'review-topic:'+thread.id+':'+id,dedupeTtlSeconds:30*24*60*60
        });
      }));
      results.forEach(result=>{if(result.status==='rejected')console.error('[review-topic-push]',result.reason.message);});
    }
  }
  return {status:preferences.status,setSubscription:preferences.setSubscription,notifyCreated};
}
function defaultService(){
  const push=require('./chat-webpush-notify');
  return createService({redisPipeline:require('./redis').pipeline,sendToMemberDevices:push.sendToMemberDevices,disabledKey:push.CHAT_PUSH_DISABLED,subscriptionPrefix:push.CHAT_PUSH_SUB_PREFIX,pushConfigured:()=>push.readVapidEnv().pushConfigured});
}
module.exports={SUBSCRIBERS_KEY,createService,defaultService};
