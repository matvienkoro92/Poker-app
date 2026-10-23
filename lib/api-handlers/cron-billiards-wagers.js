'use strict';
module.exports=async function(req,res){
 const token=String(req.headers?.authorization||'').replace(/^Bearer\s+/i,'');
 if(!process.env.CRON_SECRET||token!==process.env.CRON_SECRET)return res.status(403).json({ok:false});
 if(req.method!=='GET'&&req.method!=='POST')return res.status(405).json({ok:false});
 try{return res.json({ok:true,...await require('../billiards-service').service.sweep()});}
 catch(e){console.error('[billiards-wagers]',e.message);return res.status(503).json({ok:false});}
};
