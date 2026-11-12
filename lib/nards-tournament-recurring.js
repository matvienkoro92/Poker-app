'use strict';
const DAY=86400000,MSK=3*3600000,DELAY=5*60000;
const CONFIG_KEY='poker_app:nards-tournaments:v1:recurring';
function matches(t,slot,template){
 if(t.recurring?.key===slot.key)return true;
 const sameDate=t.startsAt!=null&&Math.floor((t.startsAt+MSK)/DAY)===Math.floor((slot.startsAt+MSK)/DAY);
 return !t.recurring&&sameDate&&t.title===(slot.kind==='day'?template.title:'Ночной кубок двух тузов');
}
function plan({config,template,tournaments,time}){
 if(!config?.enabled||!template)return null;
 const midnight=Math.floor((time+MSK)/DAY)*DAY-MSK,slots=[];
 for(let d=-2;d<=2;d++)for(const [kind,hour]of [['night',0],['day',14]]){
  const startsAt=midnight+d*DAY+hour*3600000;slots.push({kind,startsAt,key:kind+':'+startsAt});
 }
 slots.sort((a,b)=>a.startsAt-b.startsAt);
 for(let i=1;i<slots.length;i++){
  const slot=slots[i],previous=slots[i-1];
  if(slot.startsAt<time+60000)continue;
  if(tournaments.some(t=>matches(t,slot,template)))return null;
  const prior=tournaments.find(t=>matches(t,previous,template));
  let openedAfter=previous.startsAt;
  if(prior){
   if(['registration','drawn'].includes(prior.status))return null;
   if(prior.status!=='cancelled'){
    if(prior.notices?.start&&!prior.notices.start.sent)return null;
    openedAfter=prior.notices?.start?.sentAt||prior.startedAt||prior.startsAt;
   }
  }
  if(time<openedAfter+DELAY)return null;
  return {...slot,opensAt:openedAfter+DELAY};
 }
 return null;
}
function body(template,slot){
 return {title:slot.kind==='day'?template.title:'Ночной кубок двух тузов',capacity:template.capacity,discipline:template.discipline,variant:template.variant,turnSeconds:template.turnSeconds,roundTargets:[...template.roundTargets],entryType:'free',buyIn:0,prizeKind:'tickets',prizeMode:'fixed',prizeAmounts:slot.kind==='day'?[...template.prizeAmounts]:[500],startsAt:slot.startsAt,drawAt:slot.startsAt};
}
module.exports={CONFIG_KEY,plan,body,DELAY};
