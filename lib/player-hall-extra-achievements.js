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
