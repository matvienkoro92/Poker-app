import {gameWorkerURL} from '../shared/game-version.mjs';
import {buildReplayAsync,sampleReplay} from './replay-track.mjs';
export function createReplayPlayer(){
 let worker=null,workerPending=false,workerFailed=false,serial=0,track=null,active=null,activeKey='',cachedKey='',cachedTrack=null;
 function accept(id,value){if(id!==serial)return;track=value;cachedKey=activeKey;cachedTrack=value;}
 function fallback(id,playback){buildReplayAsync(playback,{isCancelled:()=>id!==serial}).then(value=>accept(id,value)).catch(()=>{});}
 function ensureWorker(){if(worker||workerFailed)return;try{const instance=new Worker(gameWorkerURL('./app-billiards-replay-worker.js'));worker=instance;instance.onmessage=({data})=>{if(worker!==instance||data.id!==serial)return;workerPending=false;if(data.error)fallback(serial,active);else accept(serial,data.track);};instance.onerror=()=>{if(worker!==instance)return;instance.terminate();worker=null;workerPending=false;workerFailed=true;if(active)fallback(serial,active);};}catch{workerFailed=true;}}
 function clear(){serial++;active=null;activeKey='';track=null;if(workerPending){worker?.terminate();worker=null;workerPending=false;}}
 return {start(playback){clear();active=playback;activeKey=JSON.stringify(playback);track=activeKey===cachedKey?cachedTrack:null;if(track)return;ensureWorker();if(worker){workerPending=true;worker.postMessage({id:serial,playback});}else fallback(serial,playback);},sample(elapsed,state){if(!track)return false;sampleReplay(track,elapsed,state);return true;},clear,reset(){clear();cachedKey='';cachedTrack=null;},dispose(){clear();cachedKey='';cachedTrack=null;worker?.terminate();worker=null;},inspect(){return {ready:!!track,worker:!!worker};}};
}
