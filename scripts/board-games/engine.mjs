import {createDarts,dartsThrow,expireDarts} from './darts.mjs';
import {Chess} from 'chess.js';
import {createChess,chessMove,chessLegal,claimable,canClaimMove} from './chess.mjs';
import {createBackgammon,backgammonMove,backgammonRoll,backgammonLegal,undoBackgammonStep,endBackgammonTurn,progress} from './backgammon.mjs';
export const DISCIPLINES=['chess','short','long','darts'];
export function createGame(discipline='chess',options={}){if(!DISCIPLINES.includes(discipline))throw Error('Неизвестная игра');return discipline==='darts'?createDarts(options):discipline==='chess'?createChess(undefined,options.whitePlayer??0):createBackgammon(discipline,options);}
export function legalMoves(s){return s.discipline==='darts'?[]:s.discipline==='chess'?chessLegal(s):backgammonLegal(s);}
export function finish(s,winner,reason){s.winner=winner;s.endReason=reason;s.drawOffer=null;if(winner!=='draw')s.scores[winner]=1;}
export function expireTurn(s,rollDice=()=>[1+Math.floor(Math.random()*6),1+Math.floor(Math.random()*6)]){
 if(s.winner!==null)return false;
 if(s.discipline==='darts')return expireDarts(s);
 if(['short','long'].includes(s.discipline)){
  const missedBefore=[...(s.missedTurns||[0,0])],startPly=s.ply;
  let expiredPlayer=s.turn;
  if(['opening','roll'].includes(s.phase)){
   do{backgammonRoll(s,s.turn,rollDice());}while(s.phase==='opening');
   expiredPlayer=s.rollPlayer;
  }
  const missed=missedBefore[expiredPlayer]+1;
  const restoreMisses=()=>{s.missedTurns=[...missedBefore];s.missedTurns[expiredPlayer]=missed;};
  if(missed>=3){restoreMisses();finish(s,1-expiredPlayer,'timeout-skips');s.phase='finished';s.dice=[];s.stepUndo=[];return true;}
  if(s.ply!==startPly){restoreMisses();return true;}
  const player=s.turn,ply=s.ply;
  while(s.winner===null&&s.ply===ply&&s.phase==='moving'){
   const move=backgammonLegal(s).sort((a,b)=>
    (b.from===-1?-1:progress(s,player,b.from))-(a.from===-1?-1:progress(s,player,a.from))
   )[0];
   if(!move){endBackgammonTurn(s);break;}
   backgammonMove(s,player,move);
  }
  restoreMisses();
  s.stepUndo=[];
  if(s.winner===null)s.message='Время вышло · ход выполнен автоматически · '+s.message;
  return true;
 }
 const winner=1-s.turn;
 const c=new Chess(s.fen),color=winner===(s.whitePlayer??0)?'w':'b',material=c.board().flat().filter(p=>p&&p.color===color&&p.type!=='k');
 if(!material.length||c.isInsufficientMaterial()){finish(s,'draw','timeout-material');return true;}
 finish(s,winner,'timeout');return true;
}
export function action(s,player,m,dice){if(![0,1].includes(player)||!m||s.winner!==null)return false;
 if(m.type==='resign'){finish(s,1-player,'resign');if(['short','long'].includes(s.discipline)){s.winKind='koks';s.winPoints=3;s.scores[1-player]=3;s.phase='finished';s.dice=[];s.stepUndo=[];}return true;}
 if(m.type==='draw-offer'){if(s.drawOffer!==null||s.drawUsed[player])return false;s.drawOffer=player;s.drawUsed[player]=true;return true;}
 if(['draw-accept','draw-decline'].includes(m.type)){if(s.drawOffer===null||s.drawOffer===player)return false;if(m.type==='draw-accept')finish(s,'draw','agreement');else s.drawOffer=null;return true;}
 if(m.type==='draw-claim'&&s.discipline==='chess'&&s.turn===player&&(claimable(s)||m.move&&canClaimMove(s,m.move))){finish(s,'draw','claim');return true;}
 if(s.discipline==='darts')return dartsThrow(s,player,m);
 if(m.type==='undo-step'&&s.discipline!=='chess')return undoBackgammonStep(s,player);
 if(m.type==='move')return s.discipline==='chess'?chessMove(s,player,m):backgammonMove(s,player,m);
 if(m.type==='roll'&&s.discipline!=='chess')return backgammonRoll(s,player,dice);
 return false;
}
