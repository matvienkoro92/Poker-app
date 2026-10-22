import {buildReplay} from './replay-track.mjs';
self.onmessage=({data})=>{try{const track=buildReplay(data.playback);self.postMessage({id:data.id,track},[track.times.buffer,track.values.buffer]);}catch(error){self.postMessage({id:data.id,error:error.message});}};
