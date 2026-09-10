'use strict';
const {context}=require('../club-social');
const {readHero,updateHero}=require('../profile-hero');
const {resolveAccountId}=require('../account-id');
module.exports=async(req,res)=>{try{const c=await context(req,res,'profile-hero');if(!c)return;const action=c.body.action||'get';
if(action==='get'){const target=c.body.targetId?await resolveAccountId(String(c.body.targetId)):c.accountId;if(!target)return res.status(404).json({ok:false,error:'Игрок не найден'});return res.status(200).json({ok:true,hero:await readHero(target,target===c.accountId)});}
return res.status(200).json({ok:true,hero:await updateHero(c.accountId,c.body)});
}catch(e){console.error('[profile-hero]',e.message);return res.status(e.status||503).json({ok:false,error:e.status?e.message:'Герой временно недоступен'});}};
