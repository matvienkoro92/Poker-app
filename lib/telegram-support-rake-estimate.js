'use strict';
const DAY=86400000,ms=date=>Date.parse(date+'T00:00:00Z'),key=time=>new Date(time).toISOString().slice(0,10);
const finite=value=>value!==null&&value!==undefined&&value!==''&&Number.isFinite(Number(value));
function estimate(playerId,profile,periods,now=Date.now()){
 if(!/^\d+$/.test(String(playerId||'')))return {rakeMonth:null,rakePreviousMonth:null};
 const {periods:bounds}=require('./telegram-support-rake'),p=bounds(now),days=new Map();
 let latest='';
 for(const period of periods){
  if(period.endDate>p.today)continue;
  const amount=Number(period.rake[String(playerId)]||0)/100;
  for(let date=ms(period.startDate);date<=ms(period.endDate);date+=DAY){
   const day=key(date);if(days.has(day))throw Error('Overlapping rake reports');days.set(day,amount/7);
  }
  if(period.endDate>latest)latest=period.endDate;
 }
 const sync=Number(profile.syncedAt),syncDate=Number.isFinite(sync)&&sync>0?key(sync+3*3600000):'';
 const weekly=(profile.weekCounter||profile.week_counter)?.fee;
 if(syncDate&&syncDate<=p.today&&finite(weekly)){
  const weekStart=bounds(sync).week;
  // A complete processed report takes priority over a partial profile week.
  if(!days.has(weekStart)){
   const count=(ms(syncDate)-ms(weekStart))/DAY+1;
   for(let date=ms(weekStart);date<=ms(syncDate);date+=DAY)days.set(key(date),Number(weekly)/count);
   if(syncDate>latest)latest=syncDate;
  }
 }
 function sum(start,end){
  if(end<start)return null;
  let total=0;for(let date=ms(start);date<=ms(end);date+=DAY){const amount=days.get(key(date));if(amount===undefined)return null;total+=amount;}
  return Math.round(total*100)/100;
 }
 const previousEnd=key(ms(p.month)-DAY);
 return {rakeMonth:sum(p.month,latest<p.today?latest:p.today),rakePreviousMonth:sum(p.previous,previousEnd)};
}
module.exports={estimate};
