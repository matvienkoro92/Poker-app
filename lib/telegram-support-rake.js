'use strict';
const DAY=86400000;
const dateKey=ms=>new Date(ms+3*3600000).toISOString().slice(0,10);
function periods(now=Date.now()){
 const today=dateKey(now),d=new Date(today+'T00:00:00Z');
 const week=new Date(d.getTime()-((d.getUTCDay()+6)%7)*DAY).toISOString().slice(0,10);
 const month=today.slice(0,7)+'-01';
 const previous=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()-1,1)).toISOString().slice(0,10);
 return {today,week,month,previous};
}
function fee(counter){const value=counter?.fee;return value!==null&&value!==undefined&&value!==''&&Number.isFinite(Number(value))?Number(value):null;}
function baseline(snapshot){
 const total=fee(snapshot?.totalCounter||snapshot?.total_counter),today=fee(snapshot?.todayCounter||snapshot?.today_counter);
 return total===null||today===null?null:total-today;
}
function calculate(profile,snapshots,now=Date.now()){
 const p=periods(now),synced=Number(profile.syncedAt),syncDate=Number.isFinite(synced)&&synced>0?dateKey(synced):'';
 const rows={...snapshots};if(syncDate)rows[syncDate]={...profile,date:syncDate};
 const total=fee(profile.totalCounter||profile.total_counter);
 const difference=(end,start)=>end===null||start===null||end<start?null:Math.round((end-start)*100)/100;
 const current=syncDate>=p.month&&syncDate<=p.today?total:null;
 const monthStart=baseline(rows[p.month]),previousStart=baseline(rows[p.previous]);
 const weekCounter=syncDate>=p.week&&syncDate<=p.today?fee(profile.weekCounter||profile.week_counter):null;
 return {
  rakeWeek:weekCounter!==null?weekCounter:difference(syncDate>=p.week&&syncDate<=p.today?total:null,baseline(rows[p.week])),
  rakeMonth:difference(current,monthStart),
  rakePreviousMonth:difference(monthStart,previousStart)
 };
}
async function read(account,profile,run,now=Date.now()){
 const p=periods(now),dates=[...new Set([p.week,p.month,p.previous])];
 const [raw]=await run([['HMGET','poker_app:pokerplus_profile_snapshots:'+account,...dates]]);
 if(!Array.isArray(raw)||raw.length!==dates.length)throw Error('Rake snapshots unavailable');
 const snapshots={};raw.forEach((value,index)=>{if(value){const snapshot=JSON.parse(value);if(snapshot.date===dates[index])snapshots[dates[index]]=snapshot;}});
 const exact=calculate(profile,snapshots,now);
 const estimated=require('./telegram-support-rake-estimate').estimate(profile.pokerPlusUserId,profile,require('./support-rake-reports.json').periods,now);
 for(const field of ['rakeMonth','rakePreviousMonth'])if(exact[field]===null&&estimated[field]!==null){exact[field]=estimated[field];exact[field+'Approximate']=true;}
 return exact;
}
module.exports={periods,calculate,read};
