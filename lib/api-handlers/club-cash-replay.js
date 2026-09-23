'use strict';
const {context,redis}=require('../club-social');
const highlights=require('../../club-cash-highlights.json');
const handShare=require('../../starting-hands/hand-share');
const {gunzipSync}=require('node:zlib');
function featured(playerId,handId){
 for(const period of [...(highlights.months||[]),...(highlights.days||[])])for(const rows of Object.values(period.groups||{})){
  const row=rows.find(item=>item.playerId===playerId&&item.handId===handId);
  if(row)return row;
 }
 return null;
}
module.exports=async(req,res)=>{try{
 const c=await context(req,res,'club-cash-replay');if(!c)return;
 const playerId=String(c.body.playerId||''),handId=String(c.body.handId||'');
 if(!/^\d{1,24}$/.test(playerId)||!/^\d{1,24}$/.test(handId))return res.status(400).json({ok:false,error:'Некорректная раздача'});
 const row=featured(playerId,handId);
 if(!row)return res.status(404).json({ok:false,error:'Раздача не входит в подборку'});
 const [version]=await redis([['GET','poker_app:starting-hands:'+playerId+':active']]);
 if(!version)return res.status(404).json({ok:false,error:'История раздачи пока недоступна'});
 const [raw]=await redis([['HGET','poker_app:starting-hands:'+playerId+':'+version,handId]]);
 if(!raw)return res.status(404).json({ok:false,error:'История раздачи пока недоступна'});
 const replay=JSON.parse(gunzipSync(Buffer.from(raw,'base64')).toString());
 const hand={...row,mode:'cash',bb:row.resultMinor/row.bigBlindMinor};
 const text=handShare.text({...hand,metric:'resultMinor'},replay);
 const textBb=handShare.text({...hand,metric:'bb'},replay);
 return res.status(200).json({ok:true,handId,player:row.player,cards:row.cards,text,textBb});
}catch(_){return res.status(503).json({ok:false,error:'Не удалось открыть раздачу'});}};
