import {gameWorkerURL} from '../shared/game-version.mjs';
import {buildReplayAsync,sampleReplay} from './replay-track.mjs';
export function createReplayPlayer(){
 let worker=null,serial=0,track=null,active=null;
 function fallback(id,playback){buildReplayAsync(playback).then(value=>{if(id===serial)track=value;}).catch(()=>{});}
 try{worker=new Worker(gameWorkerURL('./app-billiards-replay-worker.js'));worker.onmessage=({data})=>{if(data.id!==serial)return;if(data.error)fallback(serial,active);else track=data.track;};worker.onerror=()=>{worker?.terminate();worker=null;if(active)fallback(serial,active);};}catch{}
 return {start(playback){serial++;active=playback;track=null;if(worker)worker.postMessage({id:serial,playback});else fallback(serial,playback);},sample(elapsed,state){if(!track)return false;sampleReplay(track,elapsed,state);return true;},clear(){serial++;active=null;track=null;},dispose(){serial++;worker?.terminate();},inspect(){return {ready:!!track,worker:!!worker};}};
}
