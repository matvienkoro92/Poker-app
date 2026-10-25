import {createGameSound} from './game-audio.mjs';
export function createTurnStartNotifier(play){
 let context=null,wasMine=false;
 return {update(next){if(!next.active)return;if(next.context!==context){context=next.context;wasMine=false;}const mine=next.mine===true;if(mine&&!wasMine)play();wasMine=mine;},reset(){context=null;wasMine=false;}};
}
export function mountTurnStartSound(){const audio=createGameSound('./assets/board-games/audio/your-turn.mp3');return createTurnStartNotifier(()=>audio.play());}
