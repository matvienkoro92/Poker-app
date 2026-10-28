'use strict';
// Backfill old hashes in bounded pages once; new results maintain this index atomically.
const PAGE=100;
async function page({commands,key,position,mode,start,end}){
 const index=key+':by-time',ready=key+':by-time-ready';
 if(!mode){const [done]=await commands([['GET',ready]]);mode=done?'range':'scan';}
 if(mode==='scan'){
  const [scan]=await commands([['HSCAN',key,position,'COUNT',PAGE]]);
  if(!Array.isArray(scan)||!Array.isArray(scan[1]))throw Error('Statistics scan unavailable');
  const writes=[];
  for(let i=0;i<scan[1].length;i+=2){let value;try{value=JSON.parse(scan[1][i+1]);}catch{continue;}const time=Number(typeof value==='number'?value:value?.finishedAt);if(Number.isFinite(time)&&time>0)writes.push(['ZADD',index,time,scan[1][i]]);}
  if(writes.length)await commands(writes);
  if(String(scan[0])==='0')await commands([['SET',ready,'1']]);
  return {scan,mode,preparing:true};
 }
 const [ids]=await commands([['ZRANGEBYSCORE',index,start,end,'LIMIT',Number(position),PAGE]]);
 if(!Array.isArray(ids))throw Error('Statistics index unavailable');
 const values=ids.length?(await commands([['HMGET',key,...ids]]))[0]:[];
 if(!Array.isArray(values))throw Error('Statistics records unavailable');
 return {scan:[ids.length===PAGE?String(Number(position)+ids.length):'0',ids.flatMap((id,i)=>values[i]?[id,values[i]]:[])],mode,preparing:false};
}
module.exports={page};
