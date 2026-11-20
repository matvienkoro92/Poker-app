export const checkerCount=state=>state.variant==='sprint'?(state.sprintCheckers===5?5:3):15;
export function createBackgammon(discipline='short',options={}){const sprint=discipline==='long'&&options.variant==='sprint';const points=Array(24).fill(0);if(sprint){const count=checkerCount(options);points.fill(1,0,count);points.fill(-1,24-count);}else if(discipline==='long'){points[0]=15;points[12]=-15;}else{for(const [i,n]of [[0,2],[11,5],[16,3],[18,5]])points[i]=n;for(const[i,n]of [[23,2],[12,5],[7,3],[5,5]])points[i]=-n;}return {discipline,variant:discipline==='long'&&['crazy','six-one','unsporting','sprint'].includes(options.variant)?options.variant:'classic',doubleQueue:[],...(sprint?{sprintCheckers:checkerCount(options),sprintShortRules:true}:{}),...(discipline==='long'&&options.variant==='unsporting'?{sixReserve:[0,0],trick:null,turnStart:null,previousTurn:null}:{}),allowUndo:options.allowUndo!==false,points,bar:[0,0],off:[0,0],scores:[0,0],turn:0,winner:null,endReason:null,phase:'opening',dice:[],roll:[],rollCount:0,rollPlayer:null,rollHistory:[],rollTotals:[0,0],missedTurns:[0,0],stepUndo:[],opening:true,headTaken:0,turns:[0,0],ply:0,moves:[],lastMove:null,drawOffer:null,drawUsed:[false,false],message:'Бросьте кости для первого хода'};}
export function backgammonWinPoints(s,winner){
 const loser=1-winner;if(s.off[loser]>0)return {points:1,kind:'single'};
 const opponent=v=>v*(loser===0?1:-1)>0;
 const trapped=(s.discipline==='short'||s.variant==='sprint')?(s.bar[loser]>0||s.points.some((v,i)=>opponent(v)&&progress(s,winner,i)>=18)):s.points.some((v,i)=>opponent(v)&&progress(s,loser,i)<6);
 return trapped?{points:3,kind:'koks'}:{points:2,kind:'mars'};
}
const sign=p=>p===0?1:-1;
const usesLongRoute=s=>s.discipline==='long'&&!s.sprintShortRules;
export const progress=(s,p,i)=>usesLongRoute(s)?(i-(p===0?0:12)+24)%24:p===0?i:23-i;
const index=(s,p,n)=>usesLongRoute(s)?(n+(p===0?0:12))%24:p===0?n:23-n;
function home(s,p){return !s.bar[p]&&s.points.every((v,i)=>v*sign(p)<=0||progress(s,p,i)>=18);}
function forbiddenBlock(s,p,points){for(let start=0;start<24;start++){const run=Array.from({length:6},(_,j)=>(start+j)%24);if(!run.every(i=>points[i]*sign(p)>0))continue;const steps=run.map(i=>progress(s,1-p,i));if(steps[5]-steps[0]!==5)continue;if(!s.off[1-p]&&!points.some((v,i)=>v*sign(1-p)>0&&progress(s,1-p,i)>steps[5]))return true;}return false;}
function isCaftarTransfer(s,p,move){
 return s.variant==='six-one'&&(move.die===1||move.die===6)&&move.to===index(s,p,24-move.die);
}
function caftarMoves(s){
 if(s.variant!=='six-one')return [];
 const p=s.turn,sgn=sign(p),from=index(s,p,0);
 if(s.points[from]*sgn<=0)return [];
 const moves=[];
 for(const die of [1,6]){
  if(!s.dice.includes(die))continue;
  const to=index(s,p,24-die);
  if(s.points[to]*sgn<0)continue;
  const points=[...s.points];points[from]-=sgn;points[to]+=sgn;
  if(!forbiddenBlock(s,p,points))moves.push({from,to,die});
 }
 return moves;
}
function rawMoves(s,die){const p=s.turn,sgn=sign(p),moves=[];if(s.bar[p]){const to=index(s,p,die-1);if(s.points[to]*sgn>=-1)moves.push({from:-1,to,die});return moves;}
 for(let from=0;from<24;from++){if(s.points[from]*sgn<=0)continue;const n=progress(s,p,from),next=n+die;let to;
 if(next>=24){if(!home(s,p))continue;if(next>24&&s.points.some((v,i)=>v*sgn>0&&progress(s,p,i)<n))continue;to=24;}
 else{to=index(s,p,next);if(s.points[to]*sgn<-(s.discipline==='long'&&s.variant!=='sprint'?0:1))continue;}
 if(usesLongRoute(s)){const head=p===0?0:12,limit=!['crazy','sprint'].includes(s.variant)&&s.turns[p]===0&&s.roll[0]===s.roll[1]&&[3,4,6].includes(s.roll[0])?2:1;if(from===head&&s.headTaken>=limit)continue;const points=[...s.points];points[from]-=sgn;if(to!==24)points[to]+=sgn;if(forbiddenBlock(s,p,points))continue;}
 moves.push({from,to,die});
 }return moves;
}
function trickMoves(s){
 const p=s.turn,sgn=sign(p),die=s.dice[0],moves=[];
 const trick=s.trick;
 if(!die||!['backward','opponent','return','swap'].includes(trick))return moves;
 const owner=['opponent','return'].includes(trick)?1-p:p,direction=['backward','return'].includes(trick)?-1:1;
 const ownerSign=sign(owner);
 for(let from=0;from<24;from++){
  if(s.points[from]*ownerSign<1)continue;
  if((trick==='return'||trick==='swap')&&Math.abs(s.points[from])!==1)continue;
  if(trick==='swap'){
   if(progress(s,p,from)===0&&s.headTaken>=1)continue;
   for(let to=0;to<24;to++){
    if(s.points[to]!==-sgn||Math.abs(progress(s,p,to)-progress(s,p,from))!==5)continue;
    const points=s.points.slice();points[from]=-sgn;points[to]=sgn;
    if(!forbiddenBlock(s,p,points)&&!forbiddenBlock(s,1-p,points))moves.push({from,to,die,trick});
   }
   continue;
  }
  const next=progress(s,owner,from)+die*direction;
  if(next<0||next>=24)continue;
  if(trick==='opponent'&&progress(s,owner,from)===0&&s.headTaken>=1)continue;
  const to=index(s,owner,next);
  if(s.points[to]*ownerSign<0)continue;
  const points=s.points.slice();points[from]-=ownerSign;points[to]+=ownerSign;
  if(!forbiddenBlock(s,owner,points)&&!forbiddenBlock(s,1-owner,points))moves.push({from,to,die,trick});
 }
 return moves;
}
function candidateMoves(s){
 const special=trickMoves(s);
 if(s.trick==='backward'||s.trick==='opponent')return special;
 return [...special,...caftarMoves(s),...[...new Set(s.dice)].flatMap(die=>rawMoves(s,die))];
}
function applyTrick(s,m){
 const p=s.turn,owner=['opponent','return'].includes(m.trick)?1-p:p,sgn=sign(owner);
 if(m.trick==='swap'){
  [s.points[m.from],s.points[m.to]]=[s.points[m.to],s.points[m.from]];
  if(progress(s,p,m.from)===0)s.headTaken++;
 }else{
  s.points[m.from]-=sgn;s.points[m.to]+=sgn;
  if(m.trick==='opponent'&&progress(s,owner,m.from)===0)s.headTaken++;
 }
 if(m.trick==='return'||m.trick==='swap')s.trick=null;
 s.dice.splice(s.dice.indexOf(m.die),1);
}
function hitBlot(s,point,player){
 if(s.points[point]!==-sign(player))return;
 s.points[point]=0;s.bar[1-player]++;
}
function applyStep(s,m){
 if(m.trick){applyTrick(s,m);return;}
 if(s.trick==='return'||s.trick==='rewind')s.trick=null;
 const p=s.turn,sgn=sign(p);
 if(m.from===-1){
  s.bar[p]--;
 }else{
  s.points[m.from]-=sgn;
  if(usesLongRoute(s)&&m.from===index(s,p,0)&&!isCaftarTransfer(s,p,m))s.headTaken++;
  if(s.variant==='sprint'&&!s.sprintShortRules){
   const start=progress(s,p,m.from);
   for(let n=start+1;n<Math.min(24,start+m.die);n++)hitBlot(s,index(s,p,n),p);
  }
 }
 if(m.to===24)s.off[p]++;
 else{hitBlot(s,m.to,p);s.points[m.to]+=sgn;}
 s.dice.splice(s.dice.indexOf(m.die),1);
}
// Project a legal sequence without mutating turn history or the live position.
export function backgammonAfterSteps(state,steps){
 const next={...state,points:[...state.points],bar:[...state.bar],off:[...state.off],dice:[...state.dice]};
 for(const step of steps)applyStep(next,step);
 return next;
}
// Enumerate legal continuations so partial moves cannot evade the maximum-dice rule.
export function turnSequences(s){
 if(s.winner!==null||s.phase!=='moving')return [];
 const memo=new Map();
 function walk(v){
  if(!v.dice.length)return [[]];
  const key=JSON.stringify([v.points,v.bar,v.off,v.dice,v.headTaken,v.trick]);
  if(memo.has(key))return memo.get(key);
  const sequences=[];
  for(const move of candidateMoves(v)){
   const next={...v,points:v.points.slice(),bar:v.bar.slice(),off:v.off.slice(),dice:v.dice.slice()};
   applyStep(next,move);
   for(const rest of walk(next))sequences.push([move,...rest]);
  }
  if(!sequences.length)return [[]];
  const optional=v.trick==='return'||v.trick==='swap';
  const longest=[0,0];
  const group=sequence=>Number(optional&&Boolean(sequence[0].trick));
  for(const sequence of sequences)longest[group(sequence)]=Math.max(longest[group(sequence)],sequence.length);
  let legal=sequences.filter(sequence=>sequence.length===longest[group(sequence)]);
  if(longest[0]===1&&new Set(v.dice).size>1){
   const high=Math.max(...legal.map(sequence=>sequence[0].die));
   legal=legal.filter(sequence=>sequence[0].die===high);
  }
  memo.set(key,legal);
  return legal;
 }
 return walk(s);
}
export function backgammonLegal(s){const found=new Map();for(const seq of turnSequences(s))if(seq.length)found.set(JSON.stringify(seq[0]),seq[0]);return [...found.values()];}
// Clickable destinations for consecutive steps by one checker, all drawn from legal full turns.
export function backgammonDestinations(s){
 const found=new Map();
 for(const sequence of turnSequences(s)){
  const path=[],next={...s,points:[...s.points],bar:[...s.bar],off:[...s.off],dice:[...s.dice]};
  for(const step of sequence){
   if(path.length&&(step.trick||path.at(-1).trick||path.at(-1).to===24||step.from!==path.at(-1).to))break;
   path.push(step);applyStep(next,step);
   const move=path.length===1?{...step}:{from:path[0].from,to:step.to,die:path.reduce((n,m)=>n+m.die,0),path:path.map(m=>({...m}))};
   const key=JSON.stringify([move.from,move.to,next.points,next.bar,next.off,[...next.dice].sort(),next.headTaken,next.trick,move.trick]);
   if(!found.has(key))found.set(key,move);
  }
 }
 return [...found.values()];
}
function advanceCrazy(s){
 while(s.variant==='crazy'&&s.doubleQueue?.length){
  const face=s.doubleQueue.shift();s.dice=Array(4).fill(face);s.roll=[face,face];s.headTaken=0;
  if(backgammonLegal(s).length)return true;
  s.doubleQueue=[];return false;
 }
 return false;
}
export function endBackgammonTurn(s,timeout=false){
 if(s.variant==='unsporting'&&s.reserveTurn){
  s.stepUndo=[];
  s.phase='roll';
  s.dice=[];
  s.message='Шестёрки сыграны · бросьте зары';
  return;
 }
 if(s.variant==='unsporting'){
  s.previousTurn=s.turnStart&&s.moves.length>s.turnStart.movesLength?s.turnStart:null;
  s.turnStart=null;s.trick=null;
 }
 const extraRoll=s.variant==='six-one'&&s.phase==='moving'&&s.roll.includes(1)&&s.roll.includes(6);
 s.missedTurns??=[0,0];
 if(!timeout)s.missedTurns[s.turn]=0;
 s.stepUndo=[];
 s.turns[s.turn]++;
 if(!extraRoll)s.turn=1-s.turn;
 s.ply++;
 s.phase='roll';
 s.dice=[];
 s.headTaken=0;
 s.drawOffer=null;
 s.message=extraRoll?'6–1 · Бросьте кости ещё раз':'Бросьте кости';
}
export function backgammonRoll(s,player,dice){if(s.winner!==null||!['opening','roll'].includes(s.phase)||s.phase!=='opening'&&player!==s.turn||!Array.isArray(dice)||dice.length!==2||dice.some(n=>!Number.isInteger(n)||n<1||n>6))return false;
 const opening=s.phase==='opening';s.rollHistory??=backgammonRollHistory(s);s.stepUndo=[];s.rollCount=(s.rollCount||0)+1;s.rollPlayer=player;s.roll=[...dice];if(opening){if(dice[0]===dice[1]){s.rollHistory.push({player:null,dice:[...dice],opening:true});s.message='Равные кости — бросьте ещё раз';return true;}s.turn=dice[0]>dice[1]?0:1;s.rollPlayer=s.turn;s.opening=false;if(!s.sprintShortRules){s.rollHistory.push({player:s.turn,dice:[...dice],opening:true});s.dice=[];s.doubleQueue=[];s.phase='roll';s.firstRollPending=true;s.headTaken=0;s.message=(s.turn===0?'Белые':'Чёрные')+' выиграли право первого хода. Бросьте два зара для первого хода';return true;}}
 s.firstRollPending=false;
 const playedReserve=s.variant==='unsporting'&&s.reserveTurn;
 if(s.variant==='unsporting')s.reserveTurn=false;
 s.rollHistory.push({player:s.rollPlayer,dice:[...dice],opening});s.doubleQueue=s.variant==='crazy'&&dice[0]===dice[1]?Array.from({length:6-dice[0]},(_,i)=>dice[0]+i+1):[];
 if(!Array.isArray(s.rollTotals))s.rollTotals=[0,0];s.rollTotals[s.turn]=(Number(s.rollTotals[s.turn])||0)+(dice[0]===dice[1]?dice[0]*4:dice[0]+dice[1]);
 s.dice=dice[0]===dice[1]?Array(4).fill(dice[0]):[...dice];s.phase='moving';if(!playedReserve)s.headTaken=0;s.message='Передвигайте шашки по выпавшим костям';
 if(s.variant==='unsporting'){
  if(!playedReserve)s.turnStart=unsportingSnapshot(s,player);
  s.trick=dice[0]===dice[1]?['backward','opponent','return','rewind','swap','stash'][dice[0]-1]:null;
  if(s.trick==='rewind'&&s.previousTurn?.player!==1-player)s.trick=null;
  if(['backward','opponent','return','swap'].includes(s.trick)&&!trickMoves(s).length)s.trick=null;
 }
 if(!backgammonLegal(s).length&&!['stash','rewind'].includes(s.trick)){s.doubleQueue=[];const roller=s.turn;endBackgammonTurn(s);s.message=roller===s.turn?'Нет допустимых ходов · '+s.message:'Нет допустимых ходов · ход соперника';}return true;
}
export function backgammonMove(s,player,m){
 if(m.path!==undefined){
  if(!Array.isArray(m.path)||m.path.length<2||m.path.length>4)return false;
  const valid=backgammonDestinations(s).find(v=>v.path&&v.from===m.from&&v.to===m.to&&v.die===m.die&&JSON.stringify(v.path)===JSON.stringify(m.path));
  if(!valid)return false;
  const next=structuredClone(s);
  for(const step of valid.path)if(!backgammonMove(next,player,step))return false;
  next.lastMove={from:valid.from,to:valid.to,die:valid.die,path:valid.path,player};
  Object.assign(s,next);return true;
 }
if(s.winner!==null||player!==s.turn||s.phase!=='moving')return false;const legal=backgammonLegal(s).find(v=>v.from===m.from&&v.to===m.to&&v.die===m.die&&v.trick===m.trick);if(!legal)return false;(s.stepUndo||=[]).push({turn:s.turn,ply:s.ply,rollCount:s.rollCount,doubleQueue:[...(s.doubleQueue||[])],roll:[...s.roll],points:[...s.points],bar:[...s.bar],off:[...s.off],dice:[...s.dice],headTaken:s.headTaken,trick:s.trick,lastMove:s.lastMove?{...s.lastMove}:null,movesLength:s.moves.length});applyStep(s,legal);s.lastMove={...legal,player};s.moves.push({...s.lastMove,roll:[...s.roll]});if(s.off[player]===checkerCount(s)){s.winner=player;s.endReason='borne-off';s.phase='finished';const result=backgammonWinPoints(s,player);s.winPoints=result.points;s.winKind=result.kind;s.scores[player]=result.points;s.message='Все шашки выведены'+(result.kind==='single'?' · 1 очко':result.kind==='mars'?' · Марс · 2 очка':' · Кокс · 3 очка');}else if(!s.dice.length){if(!advanceCrazy(s))endBackgammonTurn(s);}else if(!backgammonLegal(s).length&&!['stash','rewind'].includes(s.trick)){s.doubleQueue=[];endBackgammonTurn(s);}return true;}

export function canUndoBackgammon(s,player=s.turn){const last=s.stepUndo?.at(-1);return s.allowUndo!==false&&s.discipline!=='chess'&&s.winner===null&&s.phase==='moving'&&player===s.turn&&!!last&&last.turn===s.turn&&last.ply===s.ply&&last.rollCount===s.rollCount;}
export function undoBackgammonStep(s,player){if(!canUndoBackgammon(s,player))return false;const last=s.stepUndo.pop();for(const field of ['points','bar','off','dice'])s[field]=[...last[field]];s.doubleQueue=[...(last.doubleQueue||[])];s.roll=[...(last.roll||s.roll)];s.headTaken=last.headTaken;if(s.variant==='unsporting')s.trick=last.trick;s.lastMove=last.lastMove?{...last.lastMove}:null;s.moves.length=last.movesLength;return true;}

function unsportingSnapshot(s,player){
 return {player,turnsTaken:s.turns[player],points:s.points.slice(),off:s.off.slice(),reserve:s.sixReserve.slice(),movesLength:s.moves.length,lastMove:s.lastMove};
}

export function unsportingActions(s){
 if(s.variant!=='unsporting'||s.winner!==null)return [];
 if(s.phase==='roll'&&!s.reserveTurn&&s.sixReserve[s.turn]>0){
  return Array.from({length:Math.min(4,s.sixReserve[s.turn])},(_,i)=>({type:'use-sixes',count:i+1}));
 }
 if(s.phase!=='moving')return [];
 if(s.trick==='rewind')return [{type:'rewind-turn'},{type:'keep-fours'}];
 if(s.trick==='stash')return [{type:'stash-six'}];
 return [];
}

export function unsportingAction(s,player,action){
 if(player!==s.turn||!unsportingActions(s).some(option=>option.type===action.type&&option.count===action.count))return false;
 if(action.type==='rewind-turn'){
  const previous=s.previousTurn;
  s.points=previous.points.slice();s.off=previous.off.slice();s.sixReserve=previous.reserve.slice();
  s.moves.length=previous.movesLength;s.lastMove=previous.lastMove;s.turns[previous.player]=previous.turnsTaken;
  s.turnStart=null;
  endBackgammonTurn(s);
  s.message='Предыдущий ход отменён · бросьте кости заново';
 }else if(action.type==='keep-fours'){
  s.trick=null;
  if(!backgammonLegal(s).length)endBackgammonTurn(s);
 }else if(action.type==='stash-six'){
  s.dice.pop();s.sixReserve[player]++;s.stepUndo=[];
  if(!s.dice.length)endBackgammonTurn(s);
 }else{
  s.turnStart=unsportingSnapshot(s,player);
  s.sixReserve[player]-=action.count;
  s.trick=null;s.reserveTurn=true;s.roll=[6,6];s.rollPlayer=player;s.firstRollPending=false;s.phase='moving';
  s.dice=Array(action.count).fill(6);s.message='Шестёрки из заначки';
  if(!backgammonLegal(s).length){
   s.sixReserve[player]+=action.count;
   endBackgammonTurn(s);
   s.message='Шестёрки заблокированы и остались в заначке · бросьте зары';
  }
 }
 return true;
}

// Legacy rooms contain per-checker moves; collapse them into one entry per throw.
export function backgammonRollHistory(s){if(Array.isArray(s.rollHistory))return s.rollHistory;const result=[];for(const m of s.moves||[]){if(!Array.isArray(m.roll)||m.roll.length!==2)continue;const prior=result.at(-1);if(!prior||prior.player!==m.player||prior.dice.some((n,i)=>n!==m.roll[i]))result.push({player:m.player,dice:[...m.roll]});}return result;}

export function backgammonPipTotals(s,player){
 const rolled=backgammonRollHistory(s).filter(row=>row.player===player&&!row.opening).reduce((sum,row)=>sum+(row.dice[0]===row.dice[1]?(s.variant==='crazy'?Array.from({length:7-row.dice[0]},(_,i)=>(row.dice[0]+i)*4).reduce((a,b)=>a+b,0):row.dice[0]*4):row.dice[0]+row.dice[1]),0);
 const moved=(s.moves||[]).filter(move=>move.player===player).reduce((sum,move)=>sum+(Number(move.die)||0),0);
 return {rolled,moved};
}
