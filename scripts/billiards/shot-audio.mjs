import {createGameSound} from '../shared/game-audio.mjs';
export function mountShotAudio(){
 const sound=createGameSound('./assets/billiards-cue-hit.mp3',{trimSilence:true,maxDuration:.95,volume:.65});let previous=null;
 return {observe(state,visible){if(previous&&visible&&state.moving&&(!previous.moving||previous.shot!==state.shot)){sound.stop();sound.play();}previous={moving:state.moving,shot:state.shot};},reset(){previous=null;sound.stop();},dispose(){sound.dispose();}};
}
