'use strict';
const redis=require('../redis');
module.exports=async function(req,res){
  const token=String(req.headers?.authorization||'').replace(/^Bearer\s+/i,'');
  if(!process.env.CRON_SECRET||token!==process.env.CRON_SECRET)return res.status(403).json({ok:false});
  if(req.method!=='GET'&&req.method!=='POST')return res.status(405).json({ok:false});
  try{
    const daily=require('../cooler-flight-daily')(async list=>{const rows=await redis.pipeline(list,{throwOnError:true,context:'cooler-daily'});if(!rows||rows.some(r=>!r||r.error))throw new Error('Storage unavailable');return rows.map(r=>r.result);});
    await daily.settle();
    await require('../cooler-flight-winner-notifications').flush(async list=>{const rows=await redis.pipeline(list,{throwOnError:true,context:'cooler-winner'});return rows.map(r=>r.result);});
    await require('../cooler-flight-record-notifications').flush(async list=>{const rows=await redis.pipeline(list,{throwOnError:true,context:'cooler-record'});return rows.map(r=>r.result);});
    return res.json({ok:true});
  }catch(e){console.error('[cooler-daily]',e.message);return res.status(503).json({ok:false});}
};
