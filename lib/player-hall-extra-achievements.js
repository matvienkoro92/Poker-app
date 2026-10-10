'use strict';
const {nickKey}=require('./profile-appearance');
function liveStats(profile,stats,choice,sng){
 const matches=w=>w&& (w.accountId?String(w.accountId)===String(profile.accountId):nickKey(w.pokerPlusNickname||w.nick||w.displayName)===nickKey(profile.nick));
 const months=new Set(stats.clubChoiceMonths||[]);
 for(const row of choice.history||[])if((row.winners||[]).some(w=>Number(w.place||1)===1&&matches(w)))months.add(row.month);
 const wins=new Set();
 for(const tournament of sng.tournaments||[sng]){
  if(tournament.isTest===true)continue;
  for(const row of tournament.history||[])if((row.winners||[]).some(w=>Number(w.place)===1&&matches(w)))wins.add(String(tournament.id||'')+':'+row.completedAt);
  if(tournament.status==='completed'&&tournament.winnerId){
   const team=(tournament.teams||[]).find(t=>t.id===tournament.winnerId);
   const ids=team&&tournament.tournamentType==='team'?team.memberIds||[]:[tournament.winnerId];
   if((tournament.entries||[]).some(e=>ids.includes(e.id)&&matches(e)))wins.add(String(tournament.id||'')+':'+tournament.completedAt);
  }
 }
 return {clubChoice:Math.max(Number(stats.clubChoice)||0,months.size),sngChampion:wins.size};
}
module.exports={liveStats};

// Match the four profile awards that were missing from the hall collection.
function profileAwards(profile,rows,seasons){
 const key=nickKey(profile.nick),awards=[],money=n=>Number(n).toLocaleString('ru-RU')+' ₽';
 const add=(id,title,origin,metric)=>awards.push({id,title,origin,metric,kind:'achievements',art:7});
 const top=rows.filter(r=>Number(r.reward)>0).slice().sort((a,b)=>Number(b.reward)-Number(a.reward)||String(a.dateLabel).localeCompare(String(b.dateLabel))).slice(0,15);
 const wins=top.flatMap((r,n)=>nickKey(r.nick)===key?[`${n+1} место · ${money(r.reward)} · ${r.dateLabel}`]:[]);
 if(wins.length)add('top-win-2026','Топ занос клуба 2026',wins.join(' · '),{value:Math.max(...top.filter(r=>nickKey(r.nick)===key).map(r=>Number(r.reward))),unit:'rub'});
 const placements=seasons.filter(r=>Number(r.place)>=1&&Number(r.place)<=10);
 if(placements.length)add('rating-top10','Топ-10 рейтинга',placements.map(r=>`${r.title} · Лига ${r.league} · ${r.place}-е место`).join(' · '),{value:placements.length,unit:'count',label:'Сезонов'});
 if(key===nickKey('Em13!!'))add('offline-win','Победа в оффлайн турнире','Май · APC42 Мейн Калининград · 1 место · 2 300 000 ₽',{value:2300000,unit:'rub'});
 if(key===nickKey('ПокерМанки'))add('offline-win','Победа в оффлайн турнире','Июнь · 239 Калининград Супер баунти · 6 место · 120 000 ₽, включая 2 нокаута; подтверждённый оффлайн результат',{value:120000,unit:'rub'});
 const leaders=[{aliases:['ПокерМанки','Манки','Pokermanki'],place:1,reward:250000},{aliases:['Waaarr','Waaarrr','Waaar','Ваар'],place:2,reward:150000},{aliases:['Coo1er91','NeCoo1er91','Кулер'],place:3,reward:100000}];
 const leader=leaders.find(r=>r.aliases.some(n=>nickKey(n)===key));
 if(leader)add('poker21-leaderboard','МТТ-лидерборд Poker21',`${leader.place} место · ${money(leader.reward)} · Итоговый топ-3 Poker21`,{value:leader.reward,unit:'rub'});
 return awards;
}
module.exports.profileAwards=profileAwards;
