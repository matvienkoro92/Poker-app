'use strict';
const crypto=require('node:crypto');
const FAMILIES=['board-games','billiards'],PREFIX='poker_app:game-admission:v1:';
const validRoom=id=>/^[A-HJ-NP-Z2-9]{10}$/.test(String(id||''));
const problem=(status,code,error,conflict)=>Object.assign(Error(error),{status,code,conflict});
function create({commands,services,resolve,now=Date.now}) {
 async function scope(member,identity){
  const account=await resolve(member,identity);if(typeof account!=='string'||!account)throw Error('Game account unavailable');const [preferred]=await commands([['HGET','poker_app:id_to_user',account]]);
  const aliases=new Set([member,account,preferred].filter(Boolean));let cursor='0';
  for(let page=0;page<20;page++){
   const [scan]=await commands([['SSCAN','poker_app:account_users:'+account,cursor,'COUNT',100]]);
   if(!Array.isArray(scan)||!Array.isArray(scan[1]))throw Error('Game identity unavailable');
   scan[1].forEach(id=>aliases.add(id));cursor=String(scan[0]);if(cursor==='0')break;
   if(page===19)throw Error('Game identity scan limit');
  }
  return {account,aliases:[...aliases]};
 }
 async function conflicts(s,family,target){
  const legacy=FAMILIES.flatMap(f=>s.aliases.map(member=>({family:f,member,key:'poker_app:active-game:'+f+':'+member})));
  const [values]=await commands([['MGET',PREFIX+s.account,...legacy.map(p=>p.key)]]);
  if(!Array.isArray(values)||values.length!==legacy.length+1)throw Error('Game history unavailable');
  const candidates=[];
  if(values[0]){let saved;try{saved=JSON.parse(values[0]);}catch{throw Error('Invalid active game');}if(FAMILIES.includes(saved.family)&&validRoom(saved.roomId))candidates.push(saved);}
  legacy.forEach((p,i)=>{if(validRoom(values[i+1]))candidates.push({...p,roomId:values[i+1]});});
  const unique=[...new Map(candidates.map(p=>[p.family+':'+p.roomId,p])).values()];
  if(!unique.length)return [];
  const [rooms]=await commands([['MGET',...unique.map(p=>'poker_app:'+p.family+':v1:'+p.roomId)]]);
  if(!Array.isArray(rooms)||rooms.length!==unique.length)throw Error('Game rooms unavailable');
  const parsed=rooms.map(raw=>{try{return JSON.parse(raw||'null');}catch{throw Error('Invalid game room');}});
  const paid=unique.map((candidate,i)=>({candidate,i})).filter(({i})=>parsed[i]?.wagered===true);
  const journals=paid.length?(await commands([['MGET',...paid.map(({candidate})=>'poker_app:'+candidate.family+':v1:wager:'+candidate.roomId)]]))[0]:[];
  if(!Array.isArray(journals)||journals.length!==paid.length)throw Error('Game settlements unavailable');
  const settled=new Set();paid.forEach(({i},index)=>{let journal;try{journal=JSON.parse(journals[index]||'null');}catch{throw Error('Invalid game settlement');}if(['paid','refunded','cancelled'].includes(journal?.status))settled.add(i);});
  const found=[];
  unique.forEach((candidate,i)=>{
   const room=parsed[i];if(settled.has(i))return;
   if(!room||room.expires<=now()||!room.state||room.state.winner!==null&&!(room.match?.target>1&&room.match.winner===null))return;
   const player=(room.players||[]).findIndex((id,n)=>s.aliases.includes(id)||room.playerProfiles?.[n]?.accountId===s.account);
   if(player<0)return;
   if(candidate.family===family&&candidate.roomId===target)return;
   const ready=!!room.players[1],canCancel=player===0&&!ready;
   found.push({family:candidate.family,roomId:candidate.roomId,ready,canCancel,discipline:room.state.discipline,member:room.players[player]});
  });
  return found.sort((a,b)=>Number(a.canCancel)-Number(b.canCancel));
 }
 const publicConflict=c=>{const {member,...safe}=c;return safe;};
 async function inspect({family,member,identity,roomId}){
  const s=await scope(member,identity),[conflict]=await conflicts(s,family,roomId);
  return {ok:true,conflict:conflict?publicConflict(conflict):null};
 }
 async function begin({family,member,identity,body,allowRejoin=true}){
  const s=await scope(member,identity),lock=PREFIX+'lock:'+s.account,token=crypto.randomUUID();
  const [locked]=await commands([['SET',lock,token,'NX','EX',120]]);
  if(!locked)throw problem(409,'GAME_ADMISSION_BUSY','Другая партия уже создаётся или принимается. Подождите немного.');
  const release=()=>commands([['EVAL',"if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0",1,lock,token]]);
  try{
   const retry=(body.action==='recover-create'||body.action==='create'&&Number(body.stake)>0)&&/^[a-zA-Z0-9_-]{16,80}$/.test(String(body.requestId||''));
   const target=retry?require('./billiards-wagers').roomIdFor(member,body.requestId,family):body.action==='create'||body.action==='matchmake'?'':body.roomId;
   let rejoining=false;if(allowRejoin&&body.action==='join'&&validRoom(target)){const [raw]=await commands([['GET','poker_app:'+family+':v1:'+target]]);let room;try{room=JSON.parse(raw||'null');}catch{throw Error('Invalid game room');}rejoining=room?.players?.includes(member)===true;}
   let existing=rejoining?[]:await conflicts(s,family,target);
   const playing=existing.find(c=>!c.canCancel);
   if(playing)throw problem(409,'ACTIVE_GAME_STARTED','У вас уже идёт партия. Сначала завершите её.',publicConflict(playing));
   const cancel=body.cancelCreatedRoom;
   if(cancel){
    const own=existing.find(c=>c.family===cancel.family&&c.roomId===cancel.roomId);
    if(own){
     if(!own.canCancel)throw problem(409,'ACTIVE_GAME_STARTED','В вашу партию уже вошёл соперник. Сначала завершите её.',publicConflict(own));
     // The normal cancellation path validates ownership/CAS and returns any reserved stake.
     await services[own.family].call(own.member,{action:'cancel',roomId:own.roomId},identity);
     existing=await conflicts(s,family,body.roomId);
    }
   }
   if(existing.length){const c=existing[0];throw problem(409,'ACTIVE_GAME_EXISTS',c.canCancel?'У вас уже создана партия. Сначала отмените её или дождитесь соперника.':'У вас уже идёт партия. Сначала завершите её.',publicConflict(c));}
   return {release,async remember(view){
    if(view?.roomId&&!view.spectator&&[0,1].includes(view.player)&&view.state?.winner===null){
     await commands([['SET',PREFIX+s.account,JSON.stringify({family,member,roomId:view.roomId}),'EX',86400]]);
    }
   }};
  }catch(error){await release();throw error;}
 }
 async function transition(args){
  const own=await begin(args),{body,family,member}=args;
  if(body.action!=='rematch'&&!(body.action==='replay-answer'&&body.accept===true))return own;
  let peer;
  try{
   const [raw]=await commands([['GET','poker_app:'+family+':v1:'+body.roomId]]),room=raw?JSON.parse(raw):null;
   if(room&&!room.players?.includes(member))throw problem(403,'NOT_GAME_PARTICIPANT','Вы не участвуете в этой партии.');
   const other=room?.players?.find(id=>id&&id!==member);
   if(other){
    try{peer=await begin({family,member:other,body:{action:'join',roomId:body.roomId},allowRejoin:false});}
    catch(e){if(e.code==='GAME_ADMISSION_BUSY')throw problem(409,'GAME_ADMISSION_BUSY','Соперник сейчас подключается к игре. Попробуйте ещё раз через несколько секунд.');if(['ACTIVE_GAME_EXISTS','ACTIVE_GAME_STARTED'].includes(e.code))throw problem(409,'OPPONENT_ACTIVE_GAME','У соперника уже есть другая партия. Он должен завершить или отменить её.');throw e;}
   }
   return {async release(){await Promise.all([own.release(),peer?.release()]);},async remember(view){
    const next=view.wager?.replayOffer?.status==='ready'?view.wager.replayOffer.roomId:null;
    if(next)view=await services[family].call(member,{action:'room',roomId:next},args.identity);
    await own.remember(view);
    if(peer)await peer.remember({...view,player:1-view.player});
   }};
  }catch(e){await own.release();if(peer)await peer.release();throw e;}
 }
 return {inspect,begin:transition};
}
function forApi(commands){return create({commands,services:{'board-games':require('./board-games-service').service,billiards:require('./billiards-service').service},resolve:async(member,identity)=>require('./account-canonical').canonicalAccountId(await require('./api-handlers/friends').resolveNewsAccountId(identity,member))});}
module.exports={create,forApi};
