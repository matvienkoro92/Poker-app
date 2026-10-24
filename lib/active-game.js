'use strict';
const key=(family,member)=>'poker_app:active-game:'+family+':'+member;
function active(view){return view?.roomId&&view.state&&view.state.winner===null&&!view.cancelled&&!view.spectator&&[0,1].includes(view.player);}
async function remember({family,member,commands,view}){
 if(active(view))await commands([['SET',key(family,member),view.roomId,'EX',86400]]);
}
async function read({family,member,commands,service,identity}){
 const [roomId]=await commands([['GET',key(family,member)]]);if(!roomId)return {ok:true,active:null};
 let view;
 try{view=await service.call(member,{action:'room',roomId},identity);}catch(e){if(![403,404].includes(e.status))throw e;}
 if(!active(view)){await commands([['DEL',key(family,member)]]);return {ok:true,active:null};}
 return {ok:true,active:{roomId:view.roomId,discipline:view.state.discipline,ready:view.ready,opponent:view.playerProfiles?.[1-view.player]?.name||'Соперник',stake:view.wager?.stake||0}};
}
module.exports={remember,read};
