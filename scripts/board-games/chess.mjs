import {Chess} from 'chess.js';
export const positionKey=fen=>fen.split(' ').slice(0,4).join(' ');
export function createChess(fen,whitePlayer=0){const c=new Chess(fen);return {discipline:'chess',fen:c.fen(),initialFen:c.fen(),moves:[],positions:{[positionKey(c.fen())]:1},whitePlayer,turn:c.turn()==='w'?whitePlayer:1-whitePlayer,winner:null,endReason:null,scores:[0,0],ply:0,drawOffer:null,drawUsed:[false,false],lastMove:null,message:'Ход белых'};}
export function chessLegal(s,from){if(s.winner!==null)return [];return new Chess(s.fen).moves({verbose:true,...(from?{square:from}:{})}).map(m=>({from:m.from,to:m.to,promotion:m.promotion,san:m.san,captured:m.captured}));}
export function claimable(s){return (s.positions[positionKey(s.fen)]||0)>=3||Number(s.fen.split(' ')[4])>=100;}
export function canClaimMove(s,m){if(s.winner!==null)return false;const c=new Chess(s.fen);try{c.move({from:m.from,to:m.to,promotion:m.promotion||'q'});}catch{return false;}return (s.positions[positionKey(c.fen())]||0)>=2||Number(c.fen().split(' ')[4])>=100;}
export function chessMove(s,player,m){
 if(s.winner!==null||player!==s.turn||typeof m?.from!=='string'||typeof m?.to!=='string')return false;
 const c=new Chess(s.fen);let result;try{result=c.move({from:m.from,to:m.to,promotion:m.promotion||'q'});}catch{return false;}if(!result)return false;
 s.fen=c.fen();s.moves.push({from:result.from,to:result.to,promotion:result.promotion,san:result.san});s.lastMove=s.moves.at(-1);s.ply++;s.turn=c.turn()==='w'?(s.whitePlayer??0):1-(s.whitePlayer??0);s.drawOffer=null;
 const key=positionKey(s.fen);s.positions[key]=(s.positions[key]||0)+1;
 if(c.isCheckmate()){s.winner=player;s.endReason='checkmate';s.message='Мат';}
 else if(c.isStalemate()||c.isInsufficientMaterial()||s.positions[key]>=5||Number(s.fen.split(' ')[4])>=150){s.winner='draw';s.endReason=c.isStalemate()?'stalemate':c.isInsufficientMaterial()?'material':s.positions[key]>=5?'repetition':'75-moves';s.message='Ничья';}
 else s.message=(c.turn()==='w'?'Ход белых':'Ход чёрных')+(c.isCheck()?' · шах':'');
 if(s.winner===player)s.scores[player]=1;return true;
}
export function chessPGN(s,names=['Белые','Чёрные']){const c=new Chess(s.initialFen);for(const m of s.moves)c.move(m);const white=s.whitePlayer??0;c.header('Event','Two Aces','White',names[white],'Black',names[1-white],'Result',s.winner==='draw'?'1/2-1/2':s.winner===white?'1-0':s.winner===1-white?'0-1':'*');return c.pgn();}
