'use strict';
// Uses the same combined ranking and ordering as the chat's /рейтинг commands.
module.exports=async function({commands,game,member,identity,accountId}){
 try{
  accountId=accountId||await require('./api-handlers/friends').resolveNewsAccountId(identity,member);
  const {SOURCES,combine}=require('./telegram-game-rankings');
  const keys=SOURCES[game]||(['chess','darts'].includes(game)?['free','paid'].map(mode=>'poker_app:board-games:stats:v2:'+game+':'+mode+':players'):null);
  if(!keys)return '🏆 Место в рейтинге: —';
  if(game!=='billiards')await require('./board-games-stats').migrateLegacy({commands,discipline:game});
  const [sources,profile]=await Promise.all([commands(keys.map(key=>['HGETALL',key])),require('./club-social').memberProfile(accountId)]);
  const own=combine(sources).find(row=>row.id===accountId),level=Number(profile.level);
  return '🏆 '+(own?'Место в рейтинге: '+own.rank:'В рейтинге пока нет завершённых партий')+(Number.isFinite(level)?' · Уровень '+Math.max(0,Math.floor(level)):'')+'\nИгры/победы/поражения: '+(own?own.wins+own.losses+own.draws:0)+' / '+(own?own.wins:0)+' / '+(own?own.losses:0);
 }catch(error){console.error('[challenge-standing]',error.message);return '🏆 Место в рейтинге временно недоступно';}
};
