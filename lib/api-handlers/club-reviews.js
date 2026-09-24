"use strict";
const {context,memberProfile,coachAccount}=require('../club-social');
const reviews=require('../club-reviews');
const activity=require('../review-activity');
const {sendToMemberDevices}=require('../chat-webpush-notify');
async function publicThread(thread,actor,full=true){
  const result=reviews.publicThread(thread,actor,full);
  if(!full)return result;
  result.readVersion=await reviews.readVersion(thread.id,actor.accountId);
  result.replies=result.replies.map(reply=>({...reply,readVersion:thread.replies.findIndex(r=>r.id===reply.id)+1}));
  const ids=[...new Set([thread.authorId,...result.replies.map(reply=>reply.authorId)].filter(Boolean))];
  const profiles=await Promise.all(ids.map(id=>memberProfile(id).catch(()=>({accountId:id,nick:'',name:'',level:0}))));
  const byId=new Map(profiles.map(profile=>[String(profile.accountId),profile]));
  const author=byId.get(String(thread.authorId));
  if(author&&author.nick)result.authorNick=author.nick;
  result.replies=result.replies.map(reply=>{const profile=byId.get(String(reply.authorId))||{};return {...reply,authorNick:profile.nick||reply.authorName||'Игрок',authorAvatar:profile.avatar||reply.authorAvatar||'',authorLevel:Math.max(0,Number(profile.level)||0)};});
  return result;
}
async function notify(thread,actor,reply,coach){
  if(!reply)try{await require('../review-topic-push').defaultService().notifyCreated(thread);}catch(e){console.error('[review-topic-push]',e.message);}
  try{await require('../review-telegram-notify').notify(thread,actor,reply);}catch(e){console.error('[review-telegram]',e.message);}
  const recipients=reply?Object.keys(thread.followers).filter(id=>thread.followers[id]&&(id!==thread.authorId||thread.explicitFollowers&&thread.explicitFollowers[id])):(thread.forCoach&&coach?[coach]:[]);
  for(let i=0;i<recipients.length;i+=10)await Promise.allSettled(recipients.slice(i,i+10).filter(id=>id!==actor.accountId).map(id=>sendToMemberDevices(id,{
    title:reply?(reply.coach?'Тренер ответил на раздачу':'Новый ответ в разборе'):'Новый вопрос тренеру',body:thread.title,kind:'club_review',tag:'review-'+thread.id,openUrl:'./?startapp=review_'+thread.id,dedupeKey:'review:'+thread.id+':'+(reply?reply.id:'created')+':'+id
  })));
}
module.exports=async(req,res)=>{try{
  const c=await context(req,res,'club-reviews');if(!c)return;const b=c.body,action=b.action||'list';
  if(action==='topic-push-status')return res.status(200).json({ok:true,...await require('../review-topic-push').defaultService().status(c.accountId)});
  if(action==='topic-push-set'){
    if(typeof b.enabled!=='boolean')reviews.fail('Укажите состояние подписки');
    const result=await require('../review-topic-push').defaultService().setSubscription(c.accountId,b.enabled);
    return res.status(result.ok?200:409).json(result);
  }
  if(action==='list'||action==='summary')return res.status(200).json({ok:true,...await reviews.list(c,action==='summary'?'others':b.mine===true,b.cursor,action==='summary'?20:10,action==='summary'?undefined:b.modes),activity:await activity.summary(c.accountId)});
  if(action==='read'){await reviews.markRead(b.id,c.accountId,b.version);return res.status(200).json({ok:true});}
  if(action==='get'){const t=await reviews.read(b.id);return res.status(200).json({ok:true,thread:await publicThread(t,c),accountId:c.accountId,coach:c.accountId===await coachAccount(),activity:await activity.summary(c.accountId)});}
  const p=await memberProfile(c.accountId);const coach=await coachAccount();const actor={...c,name:p.name,nick:p.nick,avatar:p.avatar,bound:p.bound,coach:coach===c.accountId};
  const commit=data=>activity.commit({...data,actor,kind:action});
  if(action==='create'){const result=await reviews.create(b,actor,commit);if(result.fresh)await notify(result.thread,actor,null,coach);return res.status(200).json({ok:true,thread:await publicThread(result.thread,actor),activity:await activity.summary(c.accountId),activityAward:result.fresh?result.thread.activityAward:null});}
  if(!reviews.idValid(b.id))reviews.fail('Разбор не найден',404);
  if(action==='subscribe'&&b.follow===true){const error=await require('../review-telegram-notify').checkSubscription(c.accountId);if(error)reviews.fail(error);}
  const result=await reviews.mutate(b.id,t=>{
    if(action==='reply')return reviews.reply(t,b,actor);
    if(action==='subscribe'){if(b.follow===true&&Object.keys(t.followers).length>=100&&!t.followers[c.accountId])reviews.fail('Лимит подписчиков обсуждения');if(b.follow===true){t.followers[c.accountId]=true;t.explicitFollowers=t.explicitFollowers||{};t.explicitFollowers[c.accountId]=true;}else{delete t.followers[c.accountId];if(t.explicitFollowers)delete t.explicitFollowers[c.accountId];}return;}
    if(action==='vote'){if(t.type!=='hand'||!['fold','call','raise'].includes(b.vote))reviews.fail('Выберите пас, колл или рейз');if(Object.keys(t.votes).length>=1000&&!t.votes[c.accountId])reviews.fail('Голосование завершено');t.votes[c.accountId]=b.vote;return;}
    if(action==='delete'){if(!c.admin&&t.authorId!==c.accountId)reviews.fail('Можно удалить только свой разбор',403);t.deleted=true;return;}
    if(action==='delete-reply'){const r=t.replies.find(r=>r.id===b.replyId);if(!r)reviews.fail('Ответ не найден',404);if(!c.admin&&r.authorId!==c.accountId)reviews.fail('Можно удалить только свой ответ',403);r.deleted=true;r.text='';return;}
    reviews.fail('Неизвестное действие');
  },action==='reply'?commit:undefined);
  if(result.result&&result.result.fresh)await notify(result.thread,actor,result.result.reply,coach);
  return res.status(200).json({ok:true,thread:result.thread.deleted?null:await publicThread(result.thread,actor),activity:await activity.summary(c.accountId),activityReason:result.result&&result.result.fresh?result.result.reply.activityReason:null,activityAward:result.result&&result.result.fresh?result.result.reply.activityAward:null});
}catch(e){console.error('[club-reviews]',e.message);return res.status(e.status||503).json({ok:false,error:e.status?e.message:'Разборы временно недоступны. Попробуйте ещё раз.'});}};
