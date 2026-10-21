'use strict';
const {pipeline,sscanall}=require('./redis');
async function readCoverage(ref,rows){
 const visitors=await sscanall('poker_app:track_links:users:'+ref,{count:500,maxPages:100,context:'tracking.coverage'});if(!visitors)throw Error('coverage_unavailable');
 const actors=new Set(rows.map(row=>row.actor)),mapped=[];
 for(let i=0;i<visitors.length;i+=200){const ids=visitors.slice(i,i+200),result=await pipeline([['HMGET','poker_app:attribution:v1:owners',...ids],['HMGET','poker_app:visitor_dt_ids',...ids]],{context:'tracking.coverage'});if(!result||result.some(r=>!r||r.error||!Array.isArray(r.result)))throw Error('coverage_unavailable');ids.forEach((id,n)=>mapped.push([id,result[0].result[n],result[1].result[n]].some(value=>value&&actors.has(value))));}
 return {trackedVisitors:visitors.length,visitorsWithJourney:mapped.filter(Boolean).length,visitorsWithoutJourney:mapped.filter(v=>!v).length,participants:rows.length,accounts:rows.filter(row=>row.accountId).length};
}
module.exports={readCoverage};
