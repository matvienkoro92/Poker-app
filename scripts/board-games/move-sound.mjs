import {createGameSound} from '../shared/game-audio.mjs';
export function createCheckerMoveSound(){return createGameSound('./assets/board-games/audio/checker-move.mp3');}
export function createDiceRollSound(){const variants=[createGameSound('./assets/board-games/audio/dice-roll.mp3'),createGameSound('./assets/board-games/audio/dice-roll-alt.mp3')];return {play(){variants[Math.floor(Math.random()*variants.length)].play();}};}
