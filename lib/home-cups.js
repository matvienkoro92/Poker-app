'use strict';
const {memories}=require('./hero-memories');
function cups(profile,rows){
 if(!profile.bound||!profile.nick)return [];
 return memories({userId:profile.accountId,nick:profile.nick},[],rows)
  .filter(i=>i.history.results[0].place===1)
  .map(i=>({...i,kind:'cups'}))
  .sort((a,b)=>b.history.results[0].reward-a.history.results[0].reward||b.history.date.localeCompare(a.history.date));
}
// Cups need only the verified nickname binding, never XP, levels or villa state.
async function read(accountId){
 const {PROFILE_HASH_KEY,BIND_HASH_KEY}=require('./pokerplus');
 const [raw,bound]=await require('./club-social').redis([['HGET',PROFILE_HASH_KEY,accountId],['HGET',BIND_HASH_KEY,accountId]]);
 let profile={};try{profile=JSON.parse(raw||'{}')||{};}catch(_){}
 const nick=require('./club-social').clean(profile.nickname||profile.Nike||profile.nick||profile.name,80);
 return {ok:true,items:cups({accountId,nick,bound:!!bound},require('./player-hall-tournament-results.json'))};
}
module.exports={cups,read};
