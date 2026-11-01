'use strict';
const rating=require('./game-rating-score'),{victoryBonus}=require('./game-rating-stakes'),{object}=require('./game-rivalries');
const stats=require('./board-games-stats'),{monthKey}=require('./billiards-achievements');
const parse=raw=>{try{return typeof raw==='string'?JSON.parse(raw):raw;}catch{return null;}};
const points=value=>Number(value).toLocaleString('ru-RU',{maximumFractionDigits:2})+' очк.';
function eventsFrom(sources){const seen=new Set(),events=[];for(const source of sources)for(const [id,raw]of Object.entries(object(source.events))){const event=parse(raw),room=event?.room;if(!room||!['short','long'].includes(room.state?.discipline)||room.state.discipline!==source.discipline||!(room.wagered===true||event.mode==='paid')||![0,1].includes(room.state.winner)||seen.has(id))continue;const profiles=room.playerProfiles;if(!Array.isArray(profiles)||profiles.length!==2||profiles.some(p=>!/^ID\d{6}$/.test(p?.accountId||''))||profiles[0].accountId===profiles[1].accountId)continue;seen.add(id);events.push({...event,eventId:id});}return events;}
function aggregate(sources,stakes=new Map()){
 const players=new Map();
 function counters(){return {wins:0,losses:0,draws:0,weightedWins:0,weightedLosses:0};}
 for(const event of eventsFrom(sources)){
  const room=event.room,month=monthKey(event.finishedAt),k=rating.stakeCoefficient(Number(room.gameXpStake)>0?room.gameXpStake:stakes.get(room.id||event.eventId.split(':')[0]));
  room.playerProfiles.forEach((p,i)=>{let row=players.get(p.accountId);if(!row){row={id:p.accountId,accountId:p.accountId,nick:p.name||'Игрок',...counters(),months:{},detailRows:[],updatedAt:0};players.set(p.accountId,row);}if(Number(event.finishedAt)>=row.updatedAt){row.nick=p.name||row.nick;row.updatedAt=Number(event.finishedAt);}
   const win=room.state.winner===i,field=win?'wins':'losses',weighted=win?'weightedWins':'weightedLosses',weight=k*(win?victoryBonus(room.state):1);row[field]++;row[weighted]+=weight;
   if(month){const m=row.months[month]||(row.months[month]=counters());m[field]++;m[weighted]+=weight;}
   row.detailRows.push({_monthKey:month,title:(win?'Победа':'Поражение')+' · '+(room.state.discipline==='long'?'Длинные нарды':'Короткие нарды'),meta:new Date(Number(event.finishedAt)).toLocaleString('ru-RU',{timeZone:'Europe/Moscow'}),note:'Вход: '+(Number(room.gameXpStake)||stakes.get(room.id)||'не сохранён')+' · '+(win&&victoryBonus(room.state)>1?(room.state.winKind==='koks'?'Кокс':'Марс'):'Обычная партия')});
  });
 }
 const rows=rating.rankPlayers([...players.values()]).filter(r=>r.wins>0).map(r=>{const monthRatings={};for(const [month,c]of Object.entries(r.months)){const score=Math.round(rating.score(c)*100)/100;monthRatings[month]={rawScore:rating.score(c),value:score,valueText:points(score),wins:c.wins,losses:c.losses};}return {accountId:r.accountId,nick:r.nick,value:r.ratingScore,valueText:points(r.ratingScore),tie:r.wins,rank:r.rank,wins:r.wins,losses:r.losses,monthRatings,detailRows:r.detailRows};});
 return {nardsKing:rows};
}
async function read(commands,{migration=true}={}){
 if(migration)await Promise.all(['short','long'].map(discipline=>stats.migrateLegacy({commands,discipline})));
 const values=await commands(['short','long'].map(discipline=>['HGETALL',stats.PREFIX+discipline+':paid:results'])),sources=['short','long'].map((discipline,i)=>({discipline,events:values[i]})),events=eventsFrom(sources);
 const missing=[...new Set(events.filter(e=>!(Number(e.room.gameXpStake)>0)).map(e=>e.room.id||e.eventId.split(':')[0]))],stakes=new Map();
 for(let start=0;start<missing.length;start+=100){const ids=missing.slice(start,start+100),[raw]=await commands([['MGET',...ids.map(id=>'poker_app:board-games:v1:wager:'+id)]]);ids.forEach((id,i)=>stakes.set(id,Number(parse(raw?.[i])?.stake)||0));}
 return aggregate(sources,stakes);
}
module.exports={aggregate,read,eventsFrom};
