import {createGameSound} from '../shared/game-audio.mjs';
const timing={trimSilence:true,maxStartDelay:120};
export function createCheckerMoveSound(){return createGameSound('./assets/board-games/audio/checker-move.mp3',timing);}
export function createDiceRollSound(){const variants=[createGameSound('./assets/board-games/audio/dice-roll.mp3',timing),createGameSound('./assets/board-games/audio/dice-roll-alt.mp3',timing)];return {play(){variants[Math.floor(Math.random()*variants.length)].play();}};}
