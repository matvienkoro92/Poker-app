// Candidate squares ignore blockers: the opponent's move may clear them.
// The actual move is always checked against the resulting legal moves.
export function premoveTargets(chess, from, color) {
 const piece=chess.get(from);if(!piece||piece.color!==color)return [];
 const x=from.charCodeAt(0)-97,y=Number(from[1])-1,targets=[];
 for(let tx=0;tx<8;tx++)for(let ty=0;ty<8;ty++){
  const dx=Math.abs(tx-x),dy=Math.abs(ty-y),forward=(ty-y)*(color==='w'?1:-1);
  if(!dx&&!dy)continue;
  const possible=piece.type==='p'?forward===1&&dx<=1||forward===2&&!dx&&y===(color==='w'?1:6):piece.type==='n'?dx*dy===2:piece.type==='b'?dx===dy:piece.type==='r'?!dx||!dy:piece.type==='q'?!dx||!dy||dx===dy:Math.max(dx,dy)===1||from===(color==='w'?'e1':'e8')&&dy===0&&dx===2;
  if(possible)targets.push(String.fromCharCode(97+tx)+(ty+1));
 }
 return targets;
}
