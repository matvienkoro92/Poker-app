'use strict';
const Protection=require('./game-connection-protection');
const crypto=require('crypto');
const TC=require('./chess-time-controls');
const turnLimitSeconds=require('./nards-turn-clock');
const Nards=require('./nards-equipment');
class GameError extends Error{constructor(status,message){super(message);this.status=status;}}
module.exports=function({load,create,cas,presence,profile=async()=>null,now=Date.now,random=()=>Array.from(crypto.randomBytes(10),b=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b%32]).join(''),randomSide=()=>crypto.randomInt(2),dice=()=>[crypto.randomInt(1,7),crypto.randomInt(1,7)]}){
 async function person(member,identity){const p=await profile(member,identity);return {level:Nards.availableLevel(p?.level),name:String(p?.name||'Игрок').replace(/[\u0000-\u001f\u007f-\u009f]/g,' ').replace(/\s+/g,' ').trim().slice(0,80),...(/^ID\d{6}$/.test(String(p?.accountId))?{accountId:p.accountId}:{})};}
 const fail=(status,text)=>{throw new GameError(status,text);};
 const CHESS_DELIVERY_LIMIT_MS=5000;
 function chessDeliveryCredit(r,time){
  if(!r.chessClockAwaitingPosition||!r.turnDeadline||r.state.winner!==null)return 0;
  const startedAt=r.turnDeadline-r.clockRemaining[r.state.turn];
  return Math.min(CHESS_DELIVERY_LIMIT_MS,Math.max(0,time-startedAt));
 }
 function effectiveDeadline(r,time){
  const deadline=Protection.deadline(r,time);
  return deadline===null?null:deadline+chessDeliveryCredit(r,Infinity);
 }
 function view(r,member,time,spectator=false){time=now();return {ok:true,roomId:r.id,revision:r.revision,gameExperience:r.gameExperience||null,ready:r.tournament?r.players.every(Boolean):!!r.players[1],tournament:r.tournament?{id:r.tournament.id,matchId:r.tournament.matchId,title:r.tournament.title,round:r.tournament.round,startsAt:r.tournament.startsAt,nextGameAt:r.tournament.nextGameAt||null,ready:r.tournament.ready,active:r.tournament.active===true,cancelled:r.tournament.cancelled===true}:null,player:spectator?-1:r.players.indexOf(member),spectator,playerProfiles:r.players.map((id,i)=>id?{name:r.playerProfiles[i]?.name||'Игрок'}:null),state:r.state,match:r.match,rematchReady:r.rematchReady||[false,false],timeControl:r.timeControl||null,clockRemaining:r.clockRemaining||null,turnSeconds:r.turnSeconds,turnDeadline:effectiveDeadline(r,time),connection:Protection.status(r,time),serverNow:time,expires:r.expires,equipment:cleanEquipment(r.equipment,r.tournament?.equipmentLevel??r.playerProfiles[0]?.level??1),equipmentSource:'host',equipmentOwner:r.tournament?.equipmentOwner||r.playerProfiles[0]?.name||'Игрок',transition:r.transition||null};}
 function unchanged(r,time){time=now();return {ok:true,unchanged:true,roomId:r.id,revision:r.revision,serverNow:time,turnDeadline:effectiveDeadline(r,time),connection:Protection.status(r,time)};}
 async function save(r,rev){r.revision=rev+1;if(!await cas(r.id,rev,r))fail(409,'Ход уже изменился. Обновляем доску.');}
 async function call(member,body,identity,pollSnapshot){const E=await import('../scripts/board-games/engine.mjs'),M=await import('../scripts/billiards/match.mjs');let time=now();
 if(body.denyDarts&&body.discipline==='darts')fail(403,'Дартс временно закрыт.');
 if(body.action==='create'){require('./board-games-wager-rules').rules(body);if(!E.DISCIPLINES.includes(body.discipline))fail(400,'Выберите игру.');if(body.variant!==undefined&&!['classic','crazy','six-one'].includes(body.variant))fail(400,'Выберите формат нард.');if(['crazy','six-one'].includes(body.variant)&&body.discipline!=='long')fail(400,'Этот формат доступен в длинных нардах.');const turnSeconds=body.discipline==='chess'&&TC.find(body.timeControl||'')?60:body.turnSeconds??(body.discipline==='chess'?60:['short','long'].includes(body.discipline)?45:30);if(!(body.discipline==='chess'?[30,60,90,180]:[15,30,45,60]).includes(turnSeconds))fail(400,'Выберите время на ход.');if(![1,3].includes(body.raceTo??1))fail(400,'Выберите одну партию или серию до 3 побед.');const control=body.discipline==='chess'?TC.find(body.timeControl||''):null;if(body.timeControl&&!control)fail(400,'Выберите контроль времени.');if(['short','long'].includes(body.discipline)&&body.allowUndo!==undefined&&typeof body.allowUndo!=='boolean')fail(400,'Выберите, можно ли отменять ход.');const dartsOptions=body.discipline==='darts'?{rounds:body.rounds??5,first:body.first??0}:{};if(body.discipline==='darts'&&(![3,5,10].includes(dartsOptions.rounds)||![0,1].includes(dartsOptions.first)))fail(400,'Выберите число раундов и первого игрока.');const side=String(body.side??'0');if(body.discipline==='chess'&&!['0','1','random'].includes(side))fail(400,'Выберите цвет фигур.');const whitePlayer=body.discipline==='chess'?(side==='random'?randomSide():Number(side)):0;const owner=await person(member,identity);for(let n=0;n<4;n++){const id=random(),r={id,revision:0,gameXpVersion:1,gameXpActions:[0,0],players:[member,null],playerProfiles:[owner,null],expires:time+7200000,turnSeconds,turnDeadline:null,timeControl:control,clockRemaining:control?TC.resetClock(control):null,match:M.createMatch(body.raceTo??1),state:E.createGame(body.discipline,{...dartsOptions,whitePlayer,variant:body.variant,allowUndo:body.allowUndo!==false}),equipment:cleanEquipment(body.equipment,owner.level)};if(await create(id,r))return view(r,member,time);}fail(503,'Не удалось создать комнату.');}
 const id=String(body.roomId||'');if(!/^[A-HJ-NP-Z2-9]{10}$/.test(id))fail(400,'Неверный код комнаты.');const r=pollSnapshot?.id===id&&['room','watch'].includes(body.action)?pollSnapshot:await load(id);if(!r||r.expires<time)fail(404,'Комната не найдена или истекла.');if(r.state.discipline==='chess')time=require('./game-request-time').moveTime(body,time);if(body.denyDarts&&r.state.discipline==='darts')fail(403,'Дартс временно закрыт.');
 if(r.tournament){
  if(body.action==='join'&&!r.players.includes(member))fail(403,'Места распределены турнирной сеткой.');
  if(['cancel','rematch'].includes(body.action))fail(409,'Партиями управляет турнир.');
  if(body.action==='move'){
   if(r.tournament.cancelled)fail(409,'Турнир отменён.');
   if(!r.players.every(Boolean)||r.tournament.startsAt==null||time<r.tournament.startsAt||!r.tournament.active)fail(409,'Дождитесь начала турнирной партии.');
   if(['draw-offer','draw-accept','draw-decline'].includes(body.move?.type))fail(400,'В турнире ничьи не предусмотрены.');
  }
 }
 if(body.action==='preview')return {ok:true,roomId:id,discipline:r.state.discipline,variant:r.state.variant||'classic',timeControl:r.timeControl||null,clockRemaining:r.clockRemaining||null,turnSeconds:r.turnSeconds,raceTo:r.match.target,allowUndo:r.state.allowUndo!==false,...(r.state.discipline==='darts'?{rounds:r.state.rounds}:{}),...(r.state.discipline==='chess'?{hostColor:(r.state.whitePlayer??0)===0?'white':'black'}:{}),caller:r.playerProfiles[0]?.name||'Игрок',participant:r.players.includes(member),full:!!r.players[1]&&!r.players.includes(member)};
 if(body.action==='watch')return body.sinceRevision===r.revision?unchanged(r,time):view(r,member,time,true);
 if(body.action==='join'&&!r.players.includes(member)){if(r.players[1])fail(409,'Место соперника уже занято.');const guest=await person(member,identity);if(guest.accountId&&guest.accountId===r.playerProfiles[0]?.accountId)fail(409,'Нельзя играть с собственным аккаунтом.');const rev=r.revision;r.players[1]=member;r.playerProfiles[1]=guest;if(r.timeControl)r.expires=time+23*3600000;r.clockRemaining=r.timeControl?TC.resetClock(r.timeControl):null;delete r.chessClockAwaitingPosition;r.turnDeadline=r.timeControl?(r.timeControl.seconds?now()+r.timeControl.seconds*1000:null):(r.state.discipline==='chess'?now():time)+turnLimitSeconds(r.state,r.turnSeconds)*1000;await save(r,rev);}
 const player=r.players.indexOf(member);if(player<0)fail(403,'Вы не участвуете в этой партии.');
 if(body.action==='cancel'){if(player!==0||r.players[1])fail(409,'Нельзя отменить начатую партию.');const rev=r.revision;r.expires=time-1;await save(r,rev);return {ok:true};}
 // Freeze the displayed balance until the active player fetches the position,
 // with a bounded wait so a missing poll cannot stop the match indefinitely.
 if(body.action==='room'&&player===r.state.turn&&r.chessClockAwaitingPosition&&r.state.winner===null){
  r.turnDeadline+=chessDeliveryCredit(r,now());
  delete r.chessClockAwaitingPosition;
  await save(r,r.revision);
 }
 const expectedRevision=r.revision;if(presence&&!r.tournament&&r.players[1]&&r.state.winner===null&&r.turnDeadline){const heartbeatTime=r.state.discipline==='chess'?now():time,seen=await presence(r.id,player,heartbeatTime);if(Protection.update(r,player,heartbeatTime,seen)&&!['move','rematch'].includes(body.action))await save(r,r.revision);}
 if(!r.tournament&&r.turnDeadline&&time>=effectiveDeadline(r,time)&&r.state.winner===null&&r.players[1]){const rev=r.revision;E.expireTurn(r.state,dice);M.recordWin(r.match,r.state.winner,r.state.scores?.[r.state.winner]||1);r.transition=null;r.turnDeadline=r.state.winner===null?time+turnLimitSeconds(r.state,r.turnSeconds)*1000:null;Protection.sync(r,time);await save(r,rev);if(body.action==='move')fail(409,'Время на ход вышло.');}
 if(['move','rematch'].includes(body.action)){if(!r.players[1])fail(409,'Дождитесь соперника.');if(body.revision!==expectedRevision)fail(409,'Позиция уже изменилась.');const rev=r.revision;
 if(body.action==='rematch'){if(['short','long','chess'].includes(r.state.discipline)){if(r.state.winner===null)fail(409,'Дождитесь завершения текущей партии.');r.rematchReady=r.rematchReady||[false,false];r.rematchReady[player]=true;if(!r.rematchReady[1-player]){await save(r,rev);return view(r,member,time);}r.rematchReady=[false,false];}else if(player!==0||r.state.winner===null)fail(409,'Следующую партию начинает создатель после завершения текущей.');r.gameXpMatchActions=r.match.winner!==null?[0,0]:[0,1].map(i=>(r.gameXpMatchActions?.[i]||0)+(r.gameXpActions?.[i]||0));r.gameXpActions=[0,0];r.gameExperience=null;r.match=M.nextMatch(r.match);r.state=E.createGame(r.state.discipline,r.state.discipline==='darts'?{rounds:r.state.rounds,first:1-r.state.starter}:{variant:r.state.variant,whitePlayer:r.state.whitePlayer??0,allowUndo:r.state.allowUndo!==false});r.transition=null;r.clockRemaining=r.timeControl?TC.resetClock(r.timeControl):null;delete r.chessClockAwaitingPosition;r.turnDeadline=r.timeControl?(r.timeControl.seconds?now()+r.timeControl.seconds*1000:null):(r.state.discipline==='chess'?now():time)+turnLimitSeconds(r.state,r.turnSeconds)*1000;}
 else{
 let move=body.move,movePlayer=player;
 if(['resign-offer','resign-accept','resign-decline'].includes(move?.type)){
  if(!r.tournament||r.state.winner!==null)fail(409,'Предложение сдачи недоступно.');
  const offer=r.state.resignOffer;
  if(move.type==='resign-offer'){
   if(offer||![1,2,3].includes(move.points))fail(400,'Выберите 1, 2 или 3 очка. Дождитесь ответа на предыдущее предложение.');
   r.state.resignOffer={player,points:move.points};
  }else{
   if(!offer||offer.player===player||offer.points!==move.points)fail(409,'Предложение уже недоступно.');
   delete r.state.resignOffer;
   if(move.type==='resign-accept'){
    movePlayer=offer.player;
    move={type:'resign',resignKind:['single','mars','koks'][offer.points-1]};
   }
  }
  if(move.type!=='resign'){await save(r,rev);return view(r,member,time);}
 }
 const before=structuredClone(r.state);if(r.wagered&&move?.type==='resign'&&r.match.winner===null){const resigned=structuredClone(r.state);resigned.winner=null;if(!E.action(resigned,player,move))fail(400,'Этот вариант сдачи недоступен.');r.state=resigned;r.match.wins[1-player]=Math.max(r.match.target,r.match.wins[1-player]+(r.state.winPoints||1));r.match.winner=1-player;}else if(!E.action(r.state,movePlayer,move,move?.type==='roll'?dice():undefined))fail(400,'Этот ход недоступен.');if(r.tournament){if(r.state.winner!==null)delete r.state.resignOffer;if(move.type==='move')r.tournament.played[player]=true;}if(move.type==='move'){r.gameXpActions=r.gameXpActions||[0,0];r.gameXpActions[player]=(r.gameXpActions?.[player]||0)+1;}r.transition=move.type==='move'?{lastMove:r.state.lastMove,startedAt:time,revision:rev+1}:null;if(!['draw-offer','draw-decline'].includes(move.type)&&(r.state.turn!==before.turn||r.state.phase!==before.phase&&r.state.phase==='moving')){if(r.timeControl){if(r.turnDeadline){const previousDeadline=Protection.deadline({...r,state:before},time)+chessDeliveryCredit({...r,state:before},time);const playedAt=Math.max(time,previousDeadline-r.clockRemaining[before.turn]);TC.advanceClock(r.clockRemaining,previousDeadline,before.turn,r.timeControl,playedAt);r.turnDeadline=now()+r.clockRemaining[r.state.turn];r.chessClockAwaitingPosition=true;}}else r.turnDeadline=(r.state.discipline==='chess'?now():time)+turnLimitSeconds(r.state,r.turnSeconds)*1000;}if(r.state.winner!==null){r.turnDeadline=null;if(r.tournament)r.tournament.gameEndedAt=time;}M.recordWin(r.match,r.state.winner,r.state.scores?.[r.state.winner]||1);}
 Protection.sync(r,now());await save(r,rev);
 }return body.action==='room'&&body.sinceRevision===r.revision?unchanged(r,time):view(r,member,time);
 }
 return {call};
};
function cleanEquipment(value,level=1){const v=value||{};return {...require('./chess-equipment').cleanChess(v,level),...Nards.cleanNards(v,level),dartsBoard:['club','ivory','night'].includes(v.dartsBoard)?v.dartsBoard:'club',dartsDart:['gold','silver','red'].includes(v.dartsDart)?v.dartsDart:'gold'};}
module.exports.GameError=GameError;module.exports.cleanEquipment=cleanEquipment;
