'use strict';
const {context,redis}=require('../club-social');
const {readBoundPokerPlusUserId}=require('../pokerplus');
const {aceHighAtShowdown}=require('../../starting-hands/insights');
const handShare=require('../../starting-hands/hand-share');
const {gunzipSync}=require('node:zlib');
const unpack=raw=>JSON.parse(gunzipSync(Buffer.from(raw,'base64')).toString());
module.exports=async(req,res)=>{try{
 const c=await context(req,res,'cash-achievement');if(!c)return;
 const target=String(c.body.targetId||c.accountId);
 if(!/^ID\d+$/.test(target))return res.status(400).json({ok:false,error:'Некорректный игрок'});
 const playerId=String(await readBoundPokerPlusUserId(target)||'');
 if(!/^\d+$/.test(playerId))return res.status(200).json({ok:true,count:0,previews:[]});
 const [version]=await redis([['GET','poker_app:starting-hands:'+playerId+':active']]);
 if(!version)return res.status(200).json({ok:true,count:0,previews:[]});
 const cacheKey='poker_app:cash_ace_high_1000:'+playerId+':'+version;
 const [cached]=await redis([['GET',cacheKey]]);
 if(cached)return res.status(200).json({ok:true,...JSON.parse(cached)});
 const store='poker_app:starting-hands:'+playerId+':'+version;
 const [packed]=await redis([['HGET',store,'list']]);
 if(!packed)return res.status(200).json({ok:true,count:0,previews:[]});
 const list=unpack(packed);
 const candidates=(Array.isArray(list.rows)?list.rows:[]).filter(row=>row.mode==='cash'&&row.game==='NLH'&&row.showdown===true&&row.resultMinor>=100000&&Array.isArray(row.cards)&&row.cards.length===2);
 let count=0;const previews=[];
 for(let start=0;start<candidates.length;start+=50){
  const batch=candidates.slice(start,start+50);
  const values=await redis(batch.map(row=>['HGET',store,String(row.handId)]));
  batch.forEach((row,index)=>{if(!values[index])return;try{
   const replay=unpack(values[index]);
   const board=(replay.events||[]).filter(event=>Array.isArray(event.board)&&event.board.length===5).at(-1)?.board;
   if(!aceHighAtShowdown(row,{board}))return;
   count++;
   const preview={handId:String(row.handId),playedAt:row.playedAt,cards:row.cards,board,resultMinor:row.resultMinor,bigBlindMinor:row.bigBlindMinor,text:handShare.text({...row,bb:row.resultMinor/row.bigBlindMinor,metric:'resultMinor'},replay)};
   previews.push(preview);
  }catch(_){} });
 }
 previews.sort((a,b)=>b.playedAt.localeCompare(a.playedAt));
 const data={count,previews:previews.slice(0,5)};
 await redis([['SETEX',cacheKey,'1800',JSON.stringify(data)]]);
 return res.status(200).json({ok:true,...data});
}catch(_){return res.status(503).json({ok:false,error:'Кеш-достижения временно недоступны'});}};
