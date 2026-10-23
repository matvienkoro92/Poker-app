'use strict';
module.exports=async function(req,res){
 const token=String(req.headers?.authorization||'').replace(/^Bearer\s+/i,'');
 if(!process.env.CRON_SECRET||token!==process.env.CRON_SECRET)return res.status(403).json({ok:false});
 if(req.method!=='GET'&&req.method!=='POST')return res.status(405).json({ok:false});
 try{
  const rows=await require('../redis').pipeline([['GET','poker_app:tournament_bet:current']],{throwOnError:true});
  const raw=rows?.[0]?.result;if(rows?.[0]?.error)throw Error('Storage unavailable');
  const state=require('./tournament-bet').applyRegistrationDeadline(raw?JSON.parse(raw):null);
  const result=await require('../tournament-bet-subscriptions').notifyClosed(state,process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN||'');
  return res.json({ok:true,...result});
 }catch(e){console.error('[tournament-bet-close]',e.message);return res.status(503).json({ok:false});}
};
