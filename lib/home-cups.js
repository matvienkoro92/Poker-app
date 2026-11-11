'use strict';
const {memories}=require('./hero-memories');
function cups(profile,rows){
 if(!profile.bound||!profile.nick)return [];
 return memories({userId:profile.accountId,nick:profile.nick},[],rows)
  .filter(i=>i.history.results[0].place===1)
  .map(i=>({...i,kind:'cups'}))
  .sort((a,b)=>b.history.results[0].reward-a.history.results[0].reward||b.history.date.localeCompare(a.history.date));
}
async function read(accountId){return {ok:true,items:cups(await require('./club-social').memberProfile(accountId),require('./player-hall-tournament-results.json'))};}
module.exports={cups,read};
