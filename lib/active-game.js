'use strict';
const key=(family,member)=>'poker_app:active-game:'+family+':'+member;
function active(view){return view?.roomId&&view.state&&(view.state.winner===null||view.match?.target>1&&view.match.winner===null)&&!['paid','refunded','cancelled'].includes(view.wager?.status)&&!view.cancelled&&!view.spectator&&[0,1].includes(view.player);}
async function remember({family,member,commands,view}){
 if(active(view))await commands([['SET',key(family,member),view.roomId,'EX',86400]]);
}
async function read({family,member,commands,service,identity}){
 const [roomId]=await commands([['GET',key(family,member)]]);if(!roomId)return {ok:true,active:null};
 let view;
 try{view=await service.call(member,{action:'room',roomId},identity);}catch(e){if(![403,404].includes(e.status))throw e;}
 if(!active(view)){await commands([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0",1,key(family,member),roomId]]);return {ok:true,active:null};}
 return {ok:true,active:{roomId:view.roomId,discipline:view.state.discipline,ready:view.ready,opponent:view.playerProfiles?.[1-view.player]?.name||'Соперник',stake:view.wager?.stake||0}};
}
module.exports={remember,read};
