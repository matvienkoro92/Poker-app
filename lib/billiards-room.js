'use strict';
const crypto=require('crypto');
const engine=()=>import('../scripts/billiards/engine.mjs');
class GameError extends Error{constructor(status,message){super(message);this.status=status;}}
module.exports=function billiardsService({load,create,cas,now=Date.now,random=()=>{const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';return Array.from(crypto.randomBytes(10),b=>a[b%32]).join('');}}){
 async function call(member,body){const E=await engine(),M=await import('../scripts/billiards/match.mjs'),time=now();if(body.action==='create'){if(body.raceTo!==undefined&&body.raceTo!==1&&body.raceTo!==3)throw new GameError(400,'Выберите одну партию или серию до 3 побед.');if(body.discipline&&!E.DISCIPLINES.includes(body.discipline))throw new GameError(400,'Неизвестная дисциплина.');for(let n=0;n<4;n++){const id=random(),r={id,revision:0,expires:time+7200000,players:[member,null],match:M.createMatch(body.raceTo??1),state:E.createGame({discipline:body.discipline,color:body.color,seed:crypto.randomBytes(4).readUInt32LE(0)}),playback:null};if(await create(id,r))return view(r,member,time);}throw new GameError(503,'Не удалось создать комнату. Попробуйте ещё раз.');}
 const id=String(body.roomId||'');if(!/^[A-HJ-NP-Z2-9]{10}$/.test(id))throw new GameError(400,'Неверный код комнаты.');let r=await load(id);if(!r||r.expires<time)throw new GameError(404,'Комната не найдена или истекла.');
 r.match=r.match||M.createMatch(1);M.recordWin(r.match,r.state.winner);
 if(body.action==='join'&&!r.players.includes(member)){if(r.players[1])throw new GameError(409,'В комнате уже два игрока.');const rev=r.revision;r.players[1]=member;r.revision++;if(!await cas(id,rev,r))throw new GameError(409,'Комната изменилась. Попробуйте войти снова.');}
 const player=r.players.indexOf(member);if(player<0)throw new GameError(403,'Вы не участвуете в этой партии.');
 if(body.action==='move'||body.action==='rematch'){if(!r.players[1])throw new GameError(409,'Дождитесь друга.');if(body.revision!==r.revision)throw new GameError(409,'Ход уже изменился. Обновляем стол.');if(r.playback&&time<r.playback.startedAt+r.playback.durationMs)throw new GameError(409,'Дождитесь остановки шаров.');const rev=r.revision;
 if(body.action==='rematch'){if(r.state.winner===null)throw new GameError(409,'Сначала завершите партию.');if(player!==0)throw new GameError(403,'Новую партию начинает создатель комнаты.');r.match=M.nextMatch(r.match);r.state=E.createGame({discipline:r.state.discipline,color:r.state.color,seed:crypto.randomBytes(4).readUInt32LE(0),breaker:1-(r.state.breaker||0)});r.playback=null;}
 else{const before=structuredClone(r.state),matchBefore=structuredClone(r.match);if(!E.action(r.state,player,body.move))throw new GameError(400,'Сейчас этот ход недоступен.');r.playback=null;if(body.move.type==='shot'){let ticks=0;while(r.state.moving&&ticks<7200){E.step(r.state);ticks++;}if(r.state.moving)throw new GameError(503,'Удар не удалось рассчитать.');M.recordWin(r.match,r.state.winner);r.playback={before,matchBefore,move:structuredClone(body.move),angle:body.move.angle,power:body.move.power,startedAt:time+350,durationMs:Math.ceil(ticks/120*1000)};}}
 M.recordWin(r.match,r.state.winner);r.revision++;if(!await cas(id,rev,r))throw new GameError(409,'Ход уже принят. Обновляем стол.');}
 return view(r,member,time);
 }
 function view(r,member,time){return {ok:true,roomId:r.id,revision:r.revision,player:r.players.indexOf(member),ready:!!r.players[1],match:r.match,state:r.state,playback:r.playback,serverNow:time,expires:r.expires};}
 return {call};
};
module.exports.GameError=GameError;
