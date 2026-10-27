import {createDarts,dartsThrow,expireDarts} from './darts.mjs';
import {Chess} from 'chess.js';
import {createChess,chessMove,chessLegal,claimable,canClaimMove} from './chess.mjs';
import {createBackgammon,backgammonMove,backgammonRoll,backgammonLegal,undoBackgammonStep,endBackgammonTurn} from './backgammon.mjs';
export const DISCIPLINES=['chess','short','long','darts'];
export function createGame(discipline='chess',options={}){if(!DISCIPLINES.includes(discipline))throw Error('Неизвестная игра');return discipline==='darts'?createDarts(options):discipline==='chess'?createChess():createBackgammon(discipline);}
export function legalMoves(s){return s.discipline==='darts'?[]:s.discipline==='chess'?chessLegal(s):backgammonLegal(s);}
export function finish(s,winner,reason){s.winner=winner;s.endReason=reason;s.drawOffer=null;if(winner!=='draw')s.scores[winner]=1;}
export function expireTurn(s){if(s.winner!==null)return false;if(s.discipline==='darts')return expireDarts(s);const winner=1-s.turn;if(s.discipline!=='chess'){s.missedTurns??=[0,0];const missed=++s.missedTurns[s.turn];if(missed>=3){finish(s,winner,'timeout-skips');s.phase='finished';s.dice=[];s.stepUndo=[];}else{s.opening=false;endBackgammonTurn(s,true);s.message='Время вышло · пропуск '+missed+' из 3 · ход соперника';}return true;}if(s.discipline==='chess'){const c=new Chess(s.fen),color=winner===0?'w':'b',material=c.board().flat().filter(p=>p&&p.color===color&&p.type!=='k');if(!material.length||c.isInsufficientMaterial()){finish(s,'draw','timeout-material');return true;}}finish(s,winner,'timeout');return true;}
export function action(s,player,m,dice){if(![0,1].includes(player)||!m||s.winner!==null)return false;
 if(m.type==='resign'){finish(s,1-player,'resign');return true;}
 if(m.type==='draw-offer'){if(s.drawOffer!==null||s.drawUsed[player])return false;s.drawOffer=player;s.drawUsed[player]=true;return true;}
 if(['draw-accept','draw-decline'].includes(m.type)){if(s.drawOffer===null||s.drawOffer===player)return false;if(m.type==='draw-accept')finish(s,'draw','agreement');else s.drawOffer=null;return true;}
 if(m.type==='draw-claim'&&s.discipline==='chess'&&s.turn===player&&(claimable(s)||m.move&&canClaimMove(s,m.move))){finish(s,'draw','claim');return true;}
 if(s.discipline==='darts')return dartsThrow(s,player,m);
 if(m.type==='undo-step'&&s.discipline!=='chess')return undoBackgammonStep(s,player);
 if(m.type==='move')return s.discipline==='chess'?chessMove(s,player,m):backgammonMove(s,player,m);
 if(m.type==='roll'&&s.discipline!=='chess')return backgammonRoll(s,player,dice);
 return false;
}
