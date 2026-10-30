'use strict';
// Challenge statistics must describe the same stake mode as the room.
module.exports=async function({commands,game,member,identity,accountId,mode='free'}){
 const bucket=mode==='paid'?'paid':'free',label=bucket==='paid'?'на фишки':'бесплатные';
 try{
  accountId=accountId||await require('./api-handlers/friends').resolveNewsAccountId(identity,member);
  const {combine}=require('./telegram-game-rankings');
  let sources;
  if(game==='billiards'){
   // Saved result snapshots retain wagered after rooms expire. Do not use the
   // legacy players hashes: they combine paid and free games.
   const results=await commands(['pyramid','pool8'].map(kind=>['HGETALL','poker_app:billiards:stats:v1:'+kind+':results']));
   const {object}=require('./game-rivalries');
   sources=results.map(raw=>{const players={};for(const value of Object.values(object(raw))){
    let result;try{result=typeof value==='string'?JSON.parse(value):value;}catch{continue;}
    const room=result?.room;if(!room?.state||!room.playerProfiles||((room.wagered===true?'paid':'free')!==bucket))continue;
    const winner=room.state.winner;if(![0,1,'draw'].includes(winner))continue;
    room.playerProfiles.forEach((profile,i)=>{if(!profile?.accountId)return;const row=players[profile.accountId]||(players[profile.accountId]={wins:0,losses:0,draws:0});row[winner==='draw'?'draws':winner===i?'wins':'losses']++;if((Number(result.finishedAt)||0)>=(row.updatedAt||0)){row.updatedAt=Number(result.finishedAt)||0;row.name=profile.name;}});
   }return players;});
  }else if(['short','long','chess','darts'].includes(game)){
   await require('./board-games-stats').migrateLegacy({commands,discipline:game});
   sources=await commands([['HGETALL','poker_app:board-games:stats:v2:'+game+':'+bucket+':players']]);
  }else return '🏆 Рейтинг ('+label+'): —';
  const profile=await require('./club-social').memberProfile(accountId),own=combine(sources).find(row=>row.id===accountId),level=Number(profile.level);
  return '🏆 Рейтинг: '+label+'\n'+(own?'Место в рейтинге: '+own.rank:'В рейтинге пока нет завершённых партий')+(Number.isFinite(level)?' · Уровень '+Math.max(0,Math.floor(level)):'')+'\nИгры/победы/поражения: '+(own?own.wins+own.losses+own.draws:0)+' / '+(own?own.wins:0)+' / '+(own?own.losses:0);
 }catch(error){console.error('[challenge-standing]',error.message);return '🏆 Рейтинг ('+label+') временно недоступен';}
};
