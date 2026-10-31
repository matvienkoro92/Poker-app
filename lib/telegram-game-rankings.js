'use strict';
const rating=require('./game-rating-score');
const {object}=require('./game-rivalries');
const esc=v=>String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const SOURCES={chess:['poker_app:board-games:stats:v2:chess:free:players','poker_app:board-games:stats:v2:chess:paid:players'],billiards:['poker_app:billiards:stats:v1:pyramid:players','poker_app:billiards:stats:v1:pool8:players'],long:['poker_app:board-games:stats:v2:long:free:players','poker_app:board-games:stats:v2:long:paid:players'],short:['poker_app:board-games:stats:v2:short:free:players','poker_app:board-games:stats:v2:short:paid:players']};
function combine(sources){const players=new Map();for(const raw of sources)for(const [id,json]of Object.entries(object(raw))){let s;try{s=typeof json==='string'?JSON.parse(json):json;}catch{continue;}if(!s||typeof s!=='object')continue;const row=players.get(id)||{id,name:'Игрок',wins:0,losses:0,draws:0,updatedAt:-1};for(const key of ['wins','losses','draws'])row[key]+=Math.max(0,Number(s[key])||0);if((Number(s.updatedAt)||0)>=row.updatedAt){row.name=String(s.name||'Игрок').slice(0,50);row.updatedAt=Number(s.updatedAt)||0;}players.set(id,row);}return require('./game-rating-score').rankPlayers([...players.values()]);}
function format(game,players,accountId,mode='paid'){const title={chess:'Шахматы',billiards:'Бильярд',long:'Длинные нарды',short:'Короткие нарды'}[game],lines=['<b>🏆 '+title+' · топ-10</b>',(mode==='free'?'Бесплатные партии · вход 0':'Партии на фишки')+(game==='billiards'?' · русский бильярд и пул':''),'Счёт: победы / поражения / ничьи · И — всего партий',rating.formula,'П — победы, Н — ничьи, И — все партии.','Число 10 сглаживает рейтинг новичков. Больше побед и партий при той же результативности — выше рейтинг.',''];for(const row of players.slice(0,10))lines.push(row.rank+'. <b>'+esc(row.name)+'</b> — '+row.wins+' / '+row.losses+' / '+row.draws+' · И '+(row.wins+row.losses+row.draws)+' · Р '+Number(row.ratingScore||0).toFixed(2));if(!players.length)lines.push('Завершённых партий пока нет.');const own=players.find(p=>p.id===accountId);lines.push('',own?'Ваше место: <b>'+own.rank+'</b> · '+own.wins+' / '+own.losses+' / '+own.draws+' · И '+(own.wins+own.losses+own.draws)+' · Р '+Number(own.ratingScore||0).toFixed(2):accountId?'Ваше место: пока нет завершённых партий.':'Ваше место: привяжите аккаунт в клубном приложении.');return lines.join('\n');}
async function readPlayers({commands,game,mode='paid'}){
 const bucket=mode==='free'?'free':'paid';
  let sources;
  if(game==='billiards'){
   // Saved result snapshots retain wagered after rooms expire. Do not use the
   // legacy players hashes: they combine paid and free games.
   const results=await commands(['pyramid','pool8'].map(kind=>['HGETALL','poker_app:billiards:stats:v1:'+kind+':results']));
   const rating=require('./game-rating-score');
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
  }else throw Error('Unknown game ranking');
 return combine(sources);
}
async function read({commands,game,mode='paid',telegramId,resolveAccount=require('./account-canonical').canonicalAccountId}){
 if(!SOURCES[game]||!['free','paid'].includes(mode))throw Error('Unknown game ranking');
 const [bound]=await commands([['HGET','poker_app:visitor_dt_ids','tg_'+telegramId]]);
 const accountId=await resolveAccount(bound||'');
 return format(game,await readPlayers({commands,game,mode}),accountId,mode);
}
module.exports={read,readPlayers,combine,format,SOURCES};
