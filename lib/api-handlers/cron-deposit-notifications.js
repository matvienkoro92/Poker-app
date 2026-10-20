'use strict';
module.exports=async function(req,res){
 res.setHeader('Cache-Control','no-store');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({ok:false});
 const secret=process.env.CRON_SECRET,auth=req.headers&&(req.headers['x-cron-secret']||String(req.headers.authorization||'').replace(/^Bearer\s+/i,''));
 if(!secret||auth!==secret)return res.status(403).json({ok:false});
 const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;
 if(!token)return res.status(503).json({ok:false});
 try{return res.status(200).json({ok:true,...await require('../deposit-player-notifications').retryPending(token)});}
 catch(_){return res.status(503).json({ok:false});}
};
