'use strict';
const {timingSafeEqual}=require('node:crypto');
module.exports=async(req,res)=>{
 if(!['GET','POST'].includes(req.method))return res.status(405).json({ok:false});
 const secret=process.env.CRON_SECRET,provided=req.headers?.['x-cron-secret']||String(req.headers?.authorization||'').replace(/^Bearer\s+/i,'');
 if(!secret||typeof provided!=='string'||Buffer.byteLength(secret)!==Buffer.byteLength(provided)||!timingSafeEqual(Buffer.from(secret),Buffer.from(provided)))return res.status(403).json({ok:false});
 let body=req.body;try{if(typeof body==='string')body=JSON.parse(body);}catch{return res.status(400).json({ok:false});}
 if(body?.timerId!==undefined&&!/^[a-f0-9]{24}$/.test(String(body.timerId)))return res.status(400).json({ok:false});
 try{const support=require('../telegram-support');if(!body?.timerId){const result=await support.sweepTimers(process.env.TELEGRAM_BOT_TOKEN);return res.status(result.failed?503:200).json({ok:!result.failed,...result});}const deleted=await support.expireTimer(body.timerId,process.env.TELEGRAM_BOT_TOKEN);return res.status(200).json({ok:true,deleted});}
 catch(error){console.error('support.timer.expire',error.message);return res.status(503).json({ok:false});}
};
