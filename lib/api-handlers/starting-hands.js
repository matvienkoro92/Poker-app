'use strict';
const {context,redis}=require('../club-social');
const {readBoundPokerPlusUserId}=require('../pokerplus');
const {gunzipSync}=require('node:zlib');
module.exports=async(req,res)=>{try{
 const c=await context(req,res,'starting-hands');if(!c)return;
 const playerId=String(await readBoundPokerPlusUserId(c.accountId)||'');
 if(!/^\d+$/.test(playerId))return res.status(200).json({ok:true,playerId:'',rows:[]});
 const [version]=await redis([['GET','poker_app:starting-hands:'+playerId+':active']]);
 if(!version)return res.status(200).json({ok:true,playerId,rows:[]});
 const action=c.body.action||'list';
 if(!['list','replay'].includes(action))return res.status(400).json({ok:false,error:'Unknown action'});
 const field=action==='list'?'list':String(c.body.handId||'');
 if(action==='replay'&&!/^\d{1,24}$/.test(field))return res.status(400).json({ok:false,error:'Invalid hand'});
 const [raw]=await redis([['HGET','poker_app:starting-hands:'+playerId+':'+version,field]]);
 if(!raw)return res.status(404).json({ok:false,error:'Раздача не найдена'});
 const payload=JSON.parse(gunzipSync(Buffer.from(raw,'base64')).toString());
 return res.status(200).json({ok:true,...(action==='list'?payload:{replay:payload})});
}catch(_){return res.status(503).json({ok:false,error:'История временно недоступна'});}};
