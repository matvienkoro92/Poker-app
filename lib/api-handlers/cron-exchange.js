module.exports=async(req,res)=>{
 const secret=process.env.CRON_SECRET,provided=req.headers?.['x-cron-secret']||String(req.headers?.authorization||'').replace(/^Bearer\s+/i,'');
 if(!secret||secret!==provided)return res.status(403).json({ok:false});
 try{const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN;if(!token)throw Error('Missing bot token');return res.status(200).json({ok:true,chats:await require('../telegram-exchange').expire(token)});}
 catch(e){console.error('[exchange-expiry]',e.message);return res.status(503).json({ok:false});}
};
