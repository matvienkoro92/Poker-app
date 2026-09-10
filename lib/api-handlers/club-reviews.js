"use strict";
const {context,memberProfile,coachAccount}=require('../club-social');
const reviews=require('../club-reviews');
const {sendToMemberDevices}=require('../chat-webpush-notify');
async function notify(thread,actor,reply,coach){
  const recipients=reply?Object.keys(thread.followers).filter(id=>thread.followers[id]):(thread.forCoach&&coach?[coach]:[]);
  for(let i=0;i<recipients.length;i+=10)await Promise.allSettled(recipients.slice(i,i+10).filter(id=>id!==actor.accountId).map(id=>sendToMemberDevices(id,{
    title:reply?(reply.coach?'Тренер ответил на раздачу':'Новый ответ в разборе'):'Новый вопрос тренеру',body:thread.title,kind:'club_review',tag:'review-'+thread.id,openUrl:'./?startapp=review_'+thread.id,dedupeKey:'review:'+thread.id+':'+(reply?reply.id:'created')+':'+id
  })));
}
module.exports=async(req,res)=>{try{
  const c=await context(req,res,'club-reviews');if(!c)return;const b=c.body,action=b.action||'list';
  if(action==='list'||action==='summary')return res.status(200).json({ok:true,...await reviews.list(c,action==='summary'||b.mine===true,b.cursor)});
  if(action==='read'){await reviews.markRead(b.id,c.accountId,b.version);return res.status(200).json({ok:true});}
  if(action==='get'){const t=await reviews.read(b.id);return res.status(200).json({ok:true,thread:reviews.publicThread(t,c),accountId:c.accountId,coach:c.accountId===await coachAccount()});}
  const p=await memberProfile(c.accountId);const coach=await coachAccount();const actor={...c,name:p.name,coach:coach===c.accountId};
  if(action==='create'){const result=await reviews.create(b,actor);if(result.fresh)await notify(result.thread,actor,null,coach);return res.status(200).json({ok:true,thread:reviews.publicThread(result.thread,actor)});}
  if(!reviews.idValid(b.id))reviews.fail('Разбор не найден',404);
  const result=await reviews.mutate(b.id,t=>{
    if(action==='reply')return reviews.reply(t,b,actor);
    if(action==='subscribe'){if(b.follow===true&&Object.keys(t.followers).length>=100&&!t.followers[c.accountId])reviews.fail('Лимит подписчиков обсуждения');if(b.follow===true)t.followers[c.accountId]=true;else delete t.followers[c.accountId];return;}
    if(action==='vote'){if(t.type!=='hand'||!['fold','call','raise'].includes(b.vote))reviews.fail('Выберите пас, колл или рейз');if(Object.keys(t.votes).length>=1000&&!t.votes[c.accountId])reviews.fail('Голосование завершено');t.votes[c.accountId]=b.vote;return;}
    if(action==='delete'){if(!c.admin&&t.authorId!==c.accountId)reviews.fail('Можно удалить только свой разбор',403);t.deleted=true;return;}
    if(action==='delete-reply'){const r=t.replies.find(r=>r.id===b.replyId);if(!r)reviews.fail('Ответ не найден',404);if(!c.admin&&r.authorId!==c.accountId)reviews.fail('Можно удалить только свой ответ',403);r.deleted=true;r.text='';return;}
    reviews.fail('Неизвестное действие');
  });
  if(result.result&&result.result.fresh)await notify(result.thread,actor,result.result.reply,coach);
  return res.status(200).json({ok:true,thread:result.thread.deleted?null:reviews.publicThread(result.thread,actor)});
}catch(e){console.error('[club-reviews]',e.message);return res.status(e.status||503).json({ok:false,error:e.status?e.message:'Разборы временно недоступны. Попробуйте ещё раз.'});}};
