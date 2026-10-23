'use strict';
const crypto=require('crypto');
class GameError extends Error{constructor(status,message){super(message);this.status=status;}}
module.exports=function({load,create,cas,profile=async()=>null,now=Date.now,random=()=>Array.from(crypto.randomBytes(10),b=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b%32]).join(''),dice=()=>[crypto.randomInt(1,7),crypto.randomInt(1,7)]}){
 async function person(member,identity){const p=await profile(member,identity);return {name:String(p?.name||'Игрок').replace(/[\u0000-\u001f\u007f-\u009f]/g,' ').replace(/\s+/g,' ').trim().slice(0,80),...(/^ID\d{6}$/.test(String(p?.accountId))?{accountId:p.accountId}:{})};}
 const fail=(status,text)=>{throw new GameError(status,text);};
 function view(r,member,time,spectator=false){return {ok:true,roomId:r.id,revision:r.revision,ready:!!r.players[1],player:spectator?-1:r.players.indexOf(member),spectator,playerProfiles:r.players.map((id,i)=>id?{name:r.playerProfiles[i]?.name||'Игрок'}:null),state:r.state,match:r.match,turnSeconds:r.turnSeconds,turnDeadline:r.turnDeadline,serverNow:time,expires:r.expires,equipment:r.equipment,transition:r.transition||null};}
 function unchanged(r,time){return {ok:true,unchanged:true,roomId:r.id,revision:r.revision,serverNow:time,turnDeadline:r.turnDeadline};}
 async function save(r,rev){r.revision=rev+1;if(!await cas(r.id,rev,r))fail(409,'Ход уже изменился. Обновляем доску.');}
 async function call(member,body,identity){const E=await import('../scripts/board-games/engine.mjs'),M=await import('../scripts/billiards/match.mjs'),time=now();
 if(body.action==='create'){if(!E.DISCIPLINES.includes(body.discipline))fail(400,'Выберите шахматы или вариант нард.');if(![30,60,90,180].includes(body.turnSeconds??60))fail(400,'Выберите время на ход.');if(![1,3].includes(body.raceTo??1))fail(400,'Выберите одну партию или серию до 3 побед.');const owner=await person(member,identity);for(let n=0;n<4;n++){const id=random(),r={id,revision:0,players:[member,null],playerProfiles:[owner,null],expires:time+7200000,turnSeconds:body.turnSeconds??60,turnDeadline:null,match:M.createMatch(body.raceTo??1),state:E.createGame(body.discipline),equipment:cleanEquipment(body.equipment)};if(await create(id,r))return view(r,member,time);}fail(503,'Не удалось создать комнату.');}
 const id=String(body.roomId||'');if(!/^[A-HJ-NP-Z2-9]{10}$/.test(id))fail(400,'Неверный код комнаты.');const r=await load(id);if(!r||r.expires<time)fail(404,'Комната не найдена или истекла.');
 if(body.action==='preview')return {ok:true,roomId:id,discipline:r.state.discipline,turnSeconds:r.turnSeconds,raceTo:r.match.target,caller:r.playerProfiles[0]?.name||'Игрок',full:!!r.players[1]&&!r.players.includes(member)};
 if(body.action==='watch')return body.sinceRevision===r.revision?unchanged(r,time):view(r,member,time,true);
 if(body.action==='join'&&!r.players.includes(member)){if(r.players[1])fail(409,'Место соперника уже занято.');const guest=await person(member,identity);if(guest.accountId&&guest.accountId===r.playerProfiles[0]?.accountId)fail(409,'Нельзя играть с собственным аккаунтом.');const rev=r.revision;r.players[1]=member;r.playerProfiles[1]=guest;r.turnDeadline=time+r.turnSeconds*1000;await save(r,rev);}
 const player=r.players.indexOf(member);if(player<0)fail(403,'Вы не участвуете в этой партии.');
 if(body.action==='cancel'){if(player!==0||r.players[1])fail(409,'Нельзя отменить начатую партию.');const rev=r.revision;r.expires=time-1;await save(r,rev);return {ok:true};}
 if(r.turnDeadline&&time>=r.turnDeadline&&r.state.winner===null&&r.players[1]){const rev=r.revision;E.expireTurn(r.state);M.recordWin(r.match,r.state.winner);r.turnDeadline=null;await save(r,rev);if(body.action==='move')fail(409,'Время на ход вышло.');}
 if(['move','rematch'].includes(body.action)){if(!r.players[1])fail(409,'Дождитесь соперника.');if(body.revision!==r.revision)fail(409,'Позиция уже изменилась.');const rev=r.revision;
 if(body.action==='rematch'){if(player!==0||r.state.winner===null)fail(409,'Следующую партию начинает создатель после завершения текущей.');r.match=M.nextMatch(r.match);r.state=E.createGame(r.state.discipline);r.transition=null;r.turnDeadline=time+r.turnSeconds*1000;}
 else{const before=structuredClone(r.state),move=body.move;if(!E.action(r.state,player,move,move?.type==='roll'?dice():undefined))fail(400,'Этот ход недоступен.');r.transition=move.type==='move'?{lastMove:r.state.lastMove,startedAt:time,revision:rev+1}:null;if(!['draw-offer','draw-decline'].includes(move.type)&&(r.state.turn!==before.turn||r.state.phase!==before.phase&&r.state.phase==='moving'))r.turnDeadline=time+r.turnSeconds*1000;if(r.state.winner!==null)r.turnDeadline=null;M.recordWin(r.match,r.state.winner);}
 await save(r,rev);
 }return body.action==='room'&&body.sinceRevision===r.revision?unchanged(r,time):view(r,member,time);
 }
 return {call};
};
function cleanEquipment(value){const v=value||{};return {board:['walnut','ivory','ocean','emerald'].includes(v.board)?v.board:'walnut',pieces:['classic','royal','minimal','onyx'].includes(v.pieces)?v.pieces:'classic',checkers:['classic','pearl','jade','ruby'].includes(v.checkers)?v.checkers:'classic'};}
module.exports.GameError=GameError;module.exports.cleanEquipment=cleanEquipment;
