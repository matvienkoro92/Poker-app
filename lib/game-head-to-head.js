'use strict';
const rivals=require('./game-rivalries');
module.exports=async function({commands,roomId}){
 if(!/^[A-HJ-NP-Z2-9]{10}$/.test(String(roomId||'')))throw Object.assign(Error('Неверный код комнаты.'),{status:400});
 const [raw]=await commands([['GET','poker_app:board-games:v1:'+roomId]]);let room;try{room=JSON.parse(raw);}catch{}
 if(!room||room.expires<Date.now())throw Object.assign(Error('Комната не найдена.'),{status:404});
 const [left,right]=room.playerProfiles||[],game=room.state?.discipline;
 if(!left?.accountId||!right?.accountId||!['long','short','chess'].includes(game))return {ok:true,headToHead:null};
 const legacy=await require('./board-games-stats').migrateLegacy({commands,discipline:game});
 const bases=['free','paid'].map(mode=>'poker_app:board-games:stats:v2:'+game+':'+mode+':');
 const rawStats=await commands(bases.map(base=>['HGET',base+'players',left.accountId]));
 const rows=await Promise.all(bases.map(async(base,i)=>{let played=0;try{const p=JSON.parse(rawStats[i]||'{}');played=(Number(p.wins)||0)+(Number(p.losses)||0)+(Number(p.draws)||0);}catch{}return rivals.read({commands,base,roomPrefix:'poker_app:board-games:v1:',accountId:left.accountId,played,includeIdentity:true});}));
 const score={wins:[0,0],points:[0,0],draws:0,complete:!legacy.unresolved};
 for(const data of rows){const pair=data.rivalries.find(row=>row.id===right.accountId);if(pair){score.wins[0]+=pair.wins;score.wins[1]+=pair.losses;score.draws+=pair.draws;score.points[0]+=pair.pointsWon??pair.wins;score.points[1]+=pair.pointsLost??pair.losses;}if(data.rivalriesPending||data.rivalriesIncomplete)score.complete=false;}
 return {ok:true,headToHead:score};
};
