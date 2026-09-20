'use strict';
const {context,redis}=require('../club-social');
const {readBoundPokerPlusUserId}=require('../pokerplus');
const contestedOpponents=require('../hand-opponents');
const insights=require('../../starting-hands/insights');
const {gunzipSync}=require('node:zlib');
module.exports=async(req,res)=>{try{
 const c=await context(req,res,'starting-hands');if(!c)return;
 const playerId=String(await readBoundPokerPlusUserId(c.accountId)||'');
 if(!/^\d+$/.test(playerId))return res.status(200).json({ok:true,playerId:'',version:'',rows:[]});
 const [version]=await redis([['GET','poker_app:starting-hands:'+playerId+':active']]);
 const action=c.body.action||'list';
 if(!['list','replay','insights','opponents','stacks','version'].includes(action))return res.status(400).json({ok:false,error:'Unknown action'});
 if(action==='version')return res.status(200).json({ok:true,playerId,version:version||''});
 if(!version)return res.status(200).json({ok:true,playerId,version:'',rows:[]});
 if(action==='insights'||action==='opponents'){
  const ids=c.body.handIds;
  if(!Array.isArray(ids)||!ids.length||ids.length>100||ids.some(id=>typeof id!=='string'||!/^\d{1,24}$/.test(id)))return res.status(400).json({ok:false,error:'Invalid hand IDs'});
  const values=await redis(ids.map(id=>['HGET','poker_app:starting-hands:'+playerId+':'+version,id]));
  const signals={};ids.forEach((id,i)=>{
   if(!values[i]){signals[id]=null;return;}
   try{signals[id]=(action==='opponents'?contestedOpponents:insights.actions)(JSON.parse(gunzipSync(Buffer.from(values[i],'base64')).toString()),playerId);}
   catch(_){signals[id]=null;}
  });
  return res.status(200).json({ok:true,signals,version});
 }
 if(action==='stacks'){
  const ids=c.body.handIds;
  if(!Array.isArray(ids)||!ids.length||ids.length>100||ids.some(id=>typeof id!=='string'||!/^[0-9]{1,24}$/.test(id)))return res.status(400).json({ok:false,error:'Invalid hand IDs'});
  const values=await redis(ids.map(id=>['HGET','poker_app:starting-hands:'+playerId+':'+version,id]));
  const stacks={};ids.forEach((id,i)=>{if(!values[i])return;const replay=JSON.parse(gunzipSync(Buffer.from(values[i],'base64')).toString());const hero=(replay.stacks||[]).find(item=>item&&item.actor==='Вы');if(hero&&Number.isFinite(hero.amount)&&hero.amount>=0)stacks[id]=Math.round(hero.amount*100);});
  return res.status(200).json({ok:true,stacks,version});
 }
 const field=action==='list'?'list':String(c.body.handId||'');
 if(action==='replay'&&!/^\d{1,24}$/.test(field))return res.status(400).json({ok:false,error:'Invalid hand'});
 const [raw]=await redis([['HGET','poker_app:starting-hands:'+playerId+':'+version,field]]);
 if(!raw)return res.status(404).json({ok:false,error:'Раздача не найдена'});
 const payload=JSON.parse(gunzipSync(Buffer.from(raw,'base64')).toString());
 return res.status(200).json({ok:true,...(action==='list'?payload:{replay:payload}),version});
}catch(_){return res.status(503).json({ok:false,error:'История временно недоступна'});}};
