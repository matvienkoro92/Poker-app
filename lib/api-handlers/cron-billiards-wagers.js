'use strict';
module.exports=async function(req,res){
 const token=String(req.headers?.authorization||'').replace(/^Bearer\s+/i,'');
 if(!process.env.CRON_SECRET||token!==process.env.CRON_SECRET)return res.status(403).json({ok:false});
 if(req.method!=='GET'&&req.method!=='POST')return res.status(405).json({ok:false});
 try{const [billiards,boardGames]=await Promise.all([require('../billiards-service').service.sweep(),require('../board-games-service').service.sweep()]);return res.json({ok:true,...billiards,boardGames});}
 catch(e){console.error('[billiards-wagers]',e.message);return res.status(503).json({ok:false});}
};
