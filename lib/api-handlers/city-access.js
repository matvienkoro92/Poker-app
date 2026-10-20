'use strict';
const {authRequired,parseBody,setCors}=require('../api-auth');
module.exports=async(req,res)=>{
 setCors(res,'POST, OPTIONS');res.setHeader('Cache-Control','private, no-store');
 if(req.method==='OPTIONS')return res.status(200).end();
 if(req.method!=='POST')return res.status(405).json({ok:false,allowed:false});
 try{const token=process.env.TELEGRAM_BOT_TOKEN||process.env.TELEGRAM_TOKEN||process.env.BOT_TOKEN||'';
 const auth=authRequired(req,parseBody(req),token,{adminOnly:true});
 if(!auth.ok)return res.status(auth.status).json({ok:false,allowed:false});
 return res.status(200).json({ok:true,allowed:true});
 }catch(_){return res.status(403).json({ok:false,allowed:false});}
};
