"use strict";
const {context,redis}=require('../club-social');
const {resolveAccountId}=require('../account-id');
const {readAppearance,validate}=require('../profile-appearance');
module.exports=async(req,res)=>{try{const c=await context(req,res,'profile-appearance');if(!c)return;
const action=c.body.action||'get';if(!['get','save'].includes(action))return res.status(400).json({ok:false,error:'Неизвестное действие'});
const target=action==='save'?c.accountId:(c.body.targetId?await resolveAccountId(String(c.body.targetId)):c.accountId);
if(!target)return res.status(404).json({ok:false,error:'Профиль не найден'});
let appearance=await readAppearance(target);
if(action==='save'){const selection=validate(c.body,appearance.achievements);await redis([['SET','poker_app:profile_appearance:'+c.accountId,JSON.stringify(selection)]]);appearance={...appearance,...selection,achievement:appearance.achievements.find(a=>a.id===selection.achievement)||null};}
if(target!==c.accountId){delete appearance.achievements;delete appearance.frames;}
return res.status(200).json({ok:true,appearance});
}catch(e){console.error('[profile-appearance]',e.message);return res.status(e.status||503).json({ok:false,error:e.status?e.message:'Оформление временно недоступно'});}};
