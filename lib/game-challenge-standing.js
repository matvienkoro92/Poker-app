'use strict';
// Challenge statistics must describe the same stake mode as the room.
module.exports=async function({commands,game,member,identity,accountId,mode='free'}){
 const bucket=mode==='paid'?'paid':'free',label=bucket==='paid'?'на фишки':'бесплатные';
 try{
  accountId=accountId||await require('./api-handlers/friends').resolveNewsAccountId(identity,member);
  const players=await require('./telegram-game-rankings').readPlayers({commands,game,mode:bucket});
  const profile=await require('./club-social').memberProfile(accountId),own=players.find(row=>row.id===accountId),level=Number(profile.level);
  return '🏆 Рейтинг: '+label+'\n'+(own?'Место в рейтинге: '+own.rank+' из '+players.length:'В рейтинге пока нет завершённых партий')+(Number.isFinite(level)?' · Уровень '+Math.max(0,Math.floor(level)):'')+'\nИгры: победы/поражения\n'+(own?own.wins+own.losses+own.draws:0)+':'+(own?own.wins:0)+'/'+(own?own.losses:0);
 }catch(error){console.error('[challenge-standing]',error.message);return '🏆 Рейтинг ('+label+') временно недоступен';}
};
