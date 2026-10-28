import {settle,SETTLEMENT_ACTIONS} from './settlement.mjs';
import * as legacy from './legacy-engine.mjs';
import {tableGeometry,pocketAt,closestPoint} from './table-geometry.mjs';
import {validSpin,strikeSpin,clothStep,cushionImpact,throwImpulse,clearSpin,stillSliding} from './spin-physics.mjs';
export const W=1000,H=500,R=10,POCKETS=[[0,0],[500,0],[1000,0],[0,500],[500,500],[1000,500]];
export const DISCIPLINES=['pool8','pyramid'];
export const group=id=>id===8||id===0?null:id<8?0:1;
export const radius=s=>tableGeometry(s).r;
export const cueBall=s=>s.balls.find(b=>b.id===(s.cueId??0));
export function createGame(options={}){
 const discipline=options.discipline||'pool8';if(!DISCIPLINES.includes(discipline))throw Error('Неизвестная дисциплина');
 const color=discipline==='pyramid'&&options.color==='red'?'red':discipline==='pyramid'?'yellow':'standard',r=radius({discipline});
 // Seeded shuffle lets the server own a reproducible, unbiased rack. Opposite groups at rear corners.
 let seed=(Number(options.seed)||1)>>>0;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const order=Array.from({length:15},(_,i)=>i+1);for(let i=14;i>0;i--){const j=Math.floor(rand()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 if(discipline==='pool8'){const at=order.indexOf(8);[order[4],order[at]]=[8,order[4]];const solid=order.find(n=>n<8),stripe=order.find(n=>n>8);for(const [id,index]of [[solid,10],[stripe,14]]){const old=order.indexOf(id);[order[index],order[old]]=[id,order[index]];}}
 const balls=[{id:0,x:230,y:250,vx:0,vy:0,pocket:false}];let i=0;for(let row=0;row<5;row++)for(let j=0;j<=row;j++)balls.push({id:order[i++],x:750+row*(2*r+.05)*Math.sqrt(3)/2,y:250+(j-row/2)*(2*r+.05),vx:0,vy:0,pocket:false});
 return {rulesVersion:2,discipline,color,seed:Number(options.seed)||1,balls,turn:options.breaker===1?1:0,breaker:options.breaker===1?1:0,cueId:0,groups:[null,null],scores:[0,0],captured:[[],[]],moving:false,inHand:false,handZone:null,winner:null,shot:0,breakPending:true,message:'Разбой из дома · можно передвинуть биток',firstHit:null,sunk:[],scratch:false,pending:null,missedTurns:[0,0]};
}
function playable(s){return !s.moving&&s.winner===null&&!s.pending;}
export function placeCue(s,x,y){if(!s.rulesVersion)return legacy.placeCue(s,x,y);const r=radius(s),cue=cueBall(s);if(!playable(s)||(!s.inHand&&!s.breakPending)||!cue||![x,y].every(Number.isFinite)||x<r||x>W-r||y<r||y>H-r||(s.handZone==='head'||s.breakPending)&&x>=250||s.balls.some(b=>b.id!==cue.id&&!b.pocket&&Math.hypot(b.x-x,b.y-y)<r*2+.05)||POCKETS.some(p=>Math.hypot(p[0]-x,p[1]-y)<25))return false;Object.assign(cue,{x,y,vx:0,vy:0,pocket:false});s.nextHeadShot=s.handZone==='head';s.inHand=false;s.handZone=null;clearSpin(cue);s.message='Биток установлен · можно бить';return true;}
function onRail(b,r){const sides=[];if(b.x<=r+.2)sides.push(0);if(b.x>=W-r-.2)sides.push(1);if(b.y<=r+.2)sides.push(2);if(b.y>=H-r-.2)sides.push(3);return sides;}
export function legalTargets(s){if(s.discipline==='pyramid')return s.balls.filter(b=>!b.pocket&&b.id!==(s.cueId??0));const g=s.groups[s.turn],own=s.balls.filter(b=>b.id&&b.id!==8&&!b.pocket&&(g===null||group(b.id)===g));if(g===null&&[0,1].some(gr=>!s.balls.some(b=>!b.pocket&&group(b.id)===gr)))return [...own,...s.balls.filter(b=>b.id===8&&!b.pocket)];return own.length?own:s.balls.filter(b=>b.id===8&&!b.pocket);}
export function shoot(s,angle,power,options={}){
 if(!s.rulesVersion){const ok=legacy.shoot(s,angle,power);if(ok){s.missedTurns??=[0,0];s.missedTurns[s.turn]=0;}return ok;}
 if(!validSpin(options.spin)||!playable(s)||s.inHand||![angle,power].every(Number.isFinite)||power<.05||power>1)return false;
 const cueId=s.discipline==='pyramid'&&!s.breakPending?(options.cueId??s.cueId):0,cue=s.balls.find(b=>b.id===cueId&&!b.pocket);if(!cue||s.breakPending&&cue.x>=250)return false;
 s.cueId=cueId;const targets=legalTargets(s).map(b=>b.id),isBreak=s.breakPending;
 const safety=options.safety===true;
 if(s.discipline==='pool8'&&!isBreak&&!safety&&(!targets.includes(options.callBall)||!Number.isInteger(options.callPocket)||options.callPocket<0||options.callPocket>5))return false;
 s.missedTurns??=[0,0];s.missedTurns[s.turn]=0;
 s.headShot=!!s.nextHeadShot||isBreak;s.nextHeadShot=false;s.headExited=cue.x>=250;s.illegalHead=false;s.lastShooter=s.turn;
 s.call=isBreak?null:{ball:options.callBall,pocket:options.callPocket,safety};s.legalFirst=isBreak?s.balls.filter(b=>b.id).map(b=>b.id):targets;s.eightReady=s.discipline==='pool8'&&targets.includes(8);
 Object.assign(cue,{vx:Math.cos(angle)*(180+power*1250),vy:Math.sin(angle)*(180+power*1250)});s.spin=options.spin?{x:options.spin.x,y:options.spin.y}:{x:0,y:0};strikeSpin(cue,angle,180+power*1250,s.spin);s.contacts={balls:0,rails:0,jaws:0};s.moving=true;s.firstHit=null;s.sunk=[];s.pots=[];s.scratch=false;s.railAfter=false;s.breakRails=[];s.breakCross=[];s.tracks=Object.fromEntries(s.balls.map(b=>[b.id,{rails:[],cross:false,frozen:onRail(b,radius(s))}]));s.pyramidLegal=false;s.wasBreak=isBreak;s.breakPending=false;s.shot++;s.message='Шары в движении';return true;
}
function spot(s,id){const b=s.balls.find(b=>b.id===id),r=radius(s);if(!b)return;for(const direction of [1,-1])for(let x=750;direction>0?x<W-r:x>r;x+=direction*(2*r+.1)){if(!s.balls.some(o=>o.id!==id&&!o.pocket&&Math.hypot(o.x-x,o.y-250)<2*r+.05)){Object.assign(b,{x,y:250,vx:0,vy:0,pocket:false});return;}}// Dense line: scan safely rather than overlapping another ball.
 for(let x=r+1;x<W-r;x+=2*r+1)for(let y=r+1;y<H-r;y+=2*r+1)if(!s.balls.some(o=>o.id!==id&&!o.pocket&&Math.hypot(o.x-x,o.y-y)<2*r+.05)){Object.assign(b,{x,y,vx:0,vy:0,pocket:false});return;}
}
function poolScores(s){s.captured=s.groups.map(g=>g===null?[]:s.balls.filter(b=>b.pocket&&group(b.id)===g).map(b=>b.id).sort((a,b)=>a-b));s.scores=s.captured.map(a=>a.length);}
function win(s,p){s.winner=p;s.message='Игрок '+(p+1)+' выиграл партию';}
function finishPool(s){const p=s.turn,isBreak=s.wasBreak,foul=s.scratch||s.illegalHead||s.firstHit===null||!s.legalFirst.includes(s.firstHit)||(!isBreak&&!s.sunk.length&&!s.railAfter),eight=s.sunk.includes(8);
 if(isBreak){if(eight)spot(s,8);const illegal=!s.sunk.length&&s.breakRails.length<4;if(foul||illegal||eight){const chooser=foul||illegal?1-p:p;s.turn=chooser;s.pending={type:'pool-break',offender:p,foul,illegal,eight};s.message=foul?'Фол на разбое · выберите продолжение':illegal?'Неправильный разбой · выберите продолжение':'Восьмёрка на разбое · выставить или повторить';poolScores(s);return;}s.turn=s.sunk.length?p:1-p;s.message=s.sunk.length?'Разбой выполнен · стол открыт':'Стол открыт · ход соперника';poolScores(s);return;}
 const called=s.call&&!s.call.safety&&(s.pots||[]).some(pot=>pot.id===s.call.ball&&pot.pocket===s.call.pocket);
 if(eight){if(s.groups[p]===null&&s.eightReady&&!foul&&called){const empty=[0,1].find(g=>!s.balls.some(b=>!b.pocket&&group(b.id)===g));s.groups[p]=empty;s.groups[1-p]=1-empty;}poolScores(s);win(s,!foul&&s.eightReady&&called?p:1-p);return;}
 if(!foul&&called&&s.groups[p]===null){s.groups[p]=group(s.call.ball);s.groups[1-p]=1-s.groups[p];}
 poolScores(s);const keep=!foul&&called;if(!keep)s.turn=1-p;
 if(foul){s.inHand=true;s.handZone='any';s.cueId=0;s.balls.find(b=>b.id===0).pocket=true;s.message='Фол · биток с руки в любом месте';}else s.message=keep?'Шар засчитан · продолжайте серию':s.call?.safety?'Отыгрыш · ход соперника':'Ход соперника';
}
function finishPyramid(s){const p=s.turn,isBreak=s.wasBreak,legalBreak=s.sunk.length>0||s.breakRails.length>=3||s.breakRails.length>=2&&s.breakCross.length>0;const foul=s.firstHit===null||isBreak&&!legalBreak||!isBreak&&!s.sunk.length&&!s.pyramidLegal;
 if(foul){for(const id of s.sunk)spot(s,id);s.turn=1-p;s.pending={type:'pyramid-foul',offender:p,illegalBreak:isBreak&&!legalBreak};s.message='Штраф · соперник выбирает шар на свою полку';return;}
 for(const id of s.sunk)if(!s.captured[p].includes(id))s.captured[p].push(id);s.scores=s.captured.map(a=>a.length);if(s.scores[p]>=8){win(s,p);return;}if(!s.sunk.length)s.turn=1-p;s.cueId=s.balls.find(b=>!b.pocket)?.id??0;s.message=s.sunk.length?'Шары засчитаны · выберите любой биток':'Ход соперника · биток — любой шар';
}
function finish(s){s.moving=false;for(const b of s.balls)clearSpin(b);s.lastShot={player:s.lastShooter,potted:[...s.sunk],contacts:{...s.contacts},spin:{...s.spin}};s.discipline==='pyramid'?finishPyramid(s):finishPool(s);delete s.tracks;}
function railEvent(s,b,side){if(s.firstHit===null)return;s.railAfter=true;if(b.id!==s.cueId&&!s.breakRails.includes(b.id))s.breakRails.push(b.id);const t=s.tracks[b.id];if(t.cross||t.rails.some(v=>v!==side))s.pyramidLegal=true;if(!t.rails.includes(side))t.rails.push(side);}
function crossEvent(s,b){if(s.firstHit===null)return;const t=s.tracks[b.id];if(t.rails.length)s.pyramidLegal=true;t.cross=true;if(b.id!==s.cueId&&!s.breakCross.includes(b.id))s.breakCross.push(b.id);}
function collisionEvent(s,a,b){if(s.firstHit===null){if(a.id===s.cueId){s.firstHit=b.id;if(s.headShot&&!s.headExited&&b.x<250)s.illegalHead=true;}else if(b.id===s.cueId){s.firstHit=a.id;if(s.headShot&&!s.headExited&&a.x<250)s.illegalHead=true;}}if(s.firstHit===null)return;const ta=s.tracks[a.id],tb=s.tracks[b.id];for(const [from,to]of [[ta,tb],[tb,ta]])if(to.frozen.some(side=>from.cross||from.rails.some(r=>r!==side)))s.pyramidLegal=true;const rails=[...new Set([...ta.rails,...tb.rails])],cross=ta.cross||tb.cross;ta.rails=[...rails];tb.rails=[...rails];ta.cross=tb.cross=cross;}
export function step(s,dt=1/120){if(!s.rulesVersion)return legacy.step(s,dt);if(!s.moving)return;dt=Math.min(Math.max(dt,0),1/120);const g=tableGeometry(s),r=g.r,maxSpeed=Math.max(...s.balls.map(b=>Math.hypot(b.vx,b.vy))),parts=Math.max(1,Math.min(12,Math.ceil(maxSpeed*dt/(r*.3)))),tick=dt/parts;
 for(let sub=0;sub<parts;sub++){
  for(const b of s.balls){if(b.pocket)continue;const oldX=b.x;b.x+=b.vx*tick;b.y+=b.vy*tick;if(b.id===s.cueId&&b.x>=250)s.headExited=true;if((oldX-500)*(b.x-500)<0)crossEvent(s,b);clothStep(b,tick,s);
   // Nose segments and angled jaws share their exact geometry with the rendered cushions.
   for(const rail of g.rails){const p=closestPoint(b,rail),dx=b.x-p.x,dy=b.y-p.y,distance=Math.hypot(dx,dy);if(distance>=r||distance<.00001)continue;const nx=dx/distance,ny=dy/distance;b.x=p.x+nx*(r+.0001);b.y=p.y+ny*(r+.0001);if(cushionImpact(b,nx,ny,g.spec.restitution)){railEvent(s,b,rail.side);if(s.contacts)s.contacts[rail.jaw||Math.hypot(p.x-rail.a[0],p.y-rail.a[1])<.001||Math.hypot(p.x-rail.b[0],p.y-rail.b[1])<.001?'jaws':'rails']++;}}
   const pocket=pocketAt(b,g);if(pocket>=0){b.pocket=true;b.vx=b.vy=0;clearSpin(b);s.pots.push({id:b.id,pocket});if(b.id===s.cueId)s.scratch=true;if(s.discipline==='pyramid'||b.id!==0)s.sunk.push(b.id);}
  }
  for(let i=0;i<s.balls.length;i++)for(let j=i+1;j<s.balls.length;j++){const a=s.balls[i],b=s.balls[j];if(a.pocket||b.pocket)continue;let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>=r*2)continue;d=Math.max(d,.001);const nx=dx/d,ny=dy/d,over=(r*2-d)/2+.001;a.x-=nx*over;a.y-=ny*over;b.x+=nx*over;b.y+=ny*over;const v=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;if(v>0){collisionEvent(s,a,b);if(s.contacts)s.contacts.balls++;const impulse=v*.98;a.vx-=impulse*nx;a.vy-=impulse*ny;b.vx+=impulse*nx;b.vy+=impulse*ny;throwImpulse(a,b,nx,ny,impulse);}}
 }
 if(s.balls.every(b=>b.pocket||Math.hypot(b.vx,b.vy)<1&&!stillSliding(b))){s.balls.forEach(b=>b.vx=b.vy=0);finish(s);}}

function rerack(s,breaker,partial=false){const old={scores:s.scores,captured:s.captured},fresh=createGame({discipline:s.discipline,color:s.color,seed:s.seed+1,breaker});if(partial){fresh.scores=old.scores;fresh.captured=old.captured;for(const id of old.captured.flat())fresh.balls.find(b=>b.id===id).pocket=true;const live=fresh.balls.filter(b=>!b.pocket);let initial=live.find(b=>b.id===0);if(!initial){initial=live[0];const removed=fresh.captured.find(a=>a.includes(0));removed[removed.indexOf(0)]=initial.id;initial.pocket=true;initial=fresh.balls.find(b=>b.id===0);initial.pocket=false;}Object.assign(initial,{x:230,y:250});let n=0;for(let row=0;row<5;row++)for(let j=0;j<=row;j++){const b=live.filter(b=>b.id!==initial.id&&!b.pocket)[n++];if(b)Object.assign(b,{x:750+row*(radius(fresh)*2+.05)*Math.sqrt(3)/2,y:250+(j-row/2)*(radius(fresh)*2+.05)});}}
 Object.keys(s).forEach(k=>delete s[k]);Object.assign(s,fresh);}
function decision(s,a){const d=s.pending;if(!d||s.moving||s.winner!==null)return false;
 if(d.type==='pool-break'){const choices=d.illegal?['accept',...(d.foul?['hand']:[]),'rerack-self','rerack-opponent']:d.eight?['accept','rerack-self']:['accept','hand'];if(!choices.includes(a.choice))return false;const chooser=s.turn;s.pending=null;if(a.choice.startsWith('rerack')){rerack(s,a.choice==='rerack-self'?chooser:1-chooser);return true;}if((a.choice==='hand'||d.eight&&d.foul)||s.balls.find(b=>b.id===0).pocket){s.inHand=true;s.handZone='head';s.cueId=0;}s.message=s.inHand?'Разбой · установите биток в доме':'Стол открыт · выберите заказ';return true;}
 if(d.type==='pyramid-foul'){if(!['play','pass',...(d.illegalBreak?['rerack-self','rerack-opponent']:[])].includes(a.choice))return false;const b=s.balls.find(b=>b.id===a.ballId&&!b.pocket);if(!b)return false;const chooser=s.turn;b.pocket=true;s.captured[chooser].push(b.id);s.scores=s.captured.map(a=>a.length);s.pending=null;if(s.scores[chooser]>=8){win(s,chooser);return true;}if(a.choice.startsWith('rerack')){rerack(s,a.choice==='rerack-self'?chooser:1-chooser,true);return true;}s.turn=a.choice==='pass'?d.offender:chooser;s.cueId=s.balls.find(b=>!b.pocket)?.id??0;s.message='Штрафной шар снят · выберите любой биток';return true;}return false;
}
export function action(s,player,a){if(a&&SETTLEMENT_ACTIONS.includes(a.type))return settle(s,player,a);if(!s.rulesVersion)return a?.type==='shot'&&player===s.turn?shoot(s,a.angle,a.power,a):legacy.action(s,player,a);if(player!==s.turn||!a||typeof a!=='object')return false;if(a.type==='decision')return decision(s,a);if(a.type==='shot')return shoot(s,a.angle,a.power,a);if(a.type==='place')return placeCue(s,a.x,a.y);return false;}
export function validState(s){if(!s?.rulesVersion)return legacy.validState(s);return s.rulesVersion===2&&DISCIPLINES.includes(s.discipline)&&[0,1].includes(s.turn)&&Array.isArray(s.balls)&&s.balls.length===16&&new Set(s.balls.map(b=>b.id)).size===16&&s.balls.every(b=>Number.isInteger(b.id)&&b.id>=0&&b.id<16&&[b.x,b.y,b.vx,b.vy].every(Number.isFinite)&&['rollX','rollY','side'].every(k=>b[k]===undefined||Number.isFinite(b[k]))&&Math.abs(b.x)<2000&&Math.abs(b.y)<2000&&typeof b.pocket==='boolean')&&Array.isArray(s.groups)&&s.groups.length===2&&s.groups.every(g=>g===null||g===0||g===1)&&Array.isArray(s.scores)&&s.scores.length===2&&s.scores.every(n=>Number.isInteger(n)&&n>=0&&n<=16)&&Array.isArray(s.captured)&&s.captured.length===2&&s.captured.every(a=>Array.isArray(a)&&a.every(n=>Number.isInteger(n)&&n>=0&&n<16))&&(s.winner===null||s.winner===0||s.winner===1||s.winner==='draw')&&typeof s.message==='string'&&s.message.length<250;}

// Timeout skips are counted per player, separately from billiards fouls.
export function expireTurn(s,onAutoShot=()=>{}){
 if(s.winner!==null||s.moving)return false;
 const offender=s.turn;s.missedTurns??=[0,0];const missed=++s.missedTurns[offender];s.pending=null;s.drawOffer=null;
 if(missed>=3){s.winner=1-offender;s.endReason='timeout-skips';s.message='Три пропуска хода подряд · поражение';return true;}
 // Prepare a legal weak shot without using the player's power slider.
 let cue=cueBall(s);
 if(!cue||cue.pocket){s.cueId=0;cue=cueBall(s);s.inHand=true;s.handZone=s.breakPending?'head':'any';}
 if(s.inHand){
  let placed=false;const r=radius(s);
  for(let x=30;x<W-r&&!placed;x+=25)for(let y=30;y<H-r&&!placed;y+=25)placed=placeCue(s,x,y);
  if(!placed){s.turn=1-offender;return true;}
 }
 const targets=legalTargets(s),target=targets.reduce((best,b)=>!best||Math.hypot(b.x-cue.x,b.y-cue.y)<Math.hypot(best.x-cue.x,best.y-cue.y)?b:best,null);
 const move={type:'shot',cueId:cue.id,angle:target?Math.atan2(target.y-cue.y,target.x-cue.x):0,power:.05,safety:true};
 onAutoShot(move);
 const played=shoot(s,move.angle,move.power,move);
 // shoot() resets manual activity; an automatic shot must preserve the streak.
 s.missedTurns[offender]=missed;
 if(!played)s.turn=1-offender;
 return true;
}
