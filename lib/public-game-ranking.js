'use strict';
module.exports=async function({body,commands}){
 if(!['chess','short','long'].includes(body.discipline)||!['free','paid'].includes(body.ratingMode))return {ok:false,error:'Выберите игру и режим рейтинга.'};
 const rows=await require('./telegram-game-rankings').readPlayers({commands,game:body.discipline,mode:body.ratingMode});
 return {ok:true,guest:true,ranking:rows.slice(0,100).map(row=>Object.fromEntries(['rank','name','wins','losses','draws','played','ratingScore'].filter(key=>row[key]!==undefined).map(key=>[key,row[key]]))),self:null};
};
