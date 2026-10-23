import test from 'node:test';
import assert from 'node:assert/strict';
import {mountShotAudio} from '../scripts/billiards/shot-audio.mjs';
test('audio plays once at visible shot start, skips silence and cleans up',async()=>{
 const starts=[],events=new Map();let closed=false;
 const samples=new Float32Array(44100);samples[8820]=.5;
 globalThis.document={hidden:false,addEventListener:(n,f)=>events.set(n,f),removeEventListener:n=>events.delete(n)};
 globalThis.window={AudioContext:class{state='suspended';destination={};resume(){this.state='running';return Promise.resolve();}decodeAudioData(){return Promise.resolve({duration:1,sampleRate:44100,getChannelData:()=>samples});}createBufferSource(){return {connect(){},stop(){},start(...args){starts.push(args);}};}createGain(){return {gain:{},connect(){},disconnect(){}};}close(){closed=true;return Promise.resolve();}}};
 const oldFetch=globalThis.fetch;globalThis.fetch=async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(1)});
 try{const audio=mountShotAudio();await new Promise(resolve=>setTimeout(resolve,0));events.get('pointerdown')();audio.observe({moving:false,shot:0},true);audio.observe({moving:true,shot:1},true);audio.observe({moving:true,shot:1},true);assert.equal(starts.length,1);assert.ok(Math.abs(starts[0][1]-.195)<.001);audio.observe({moving:false,shot:1},true);audio.observe({moving:true,shot:2},false);assert.equal(starts.length,1);audio.reset();audio.observe({moving:false,shot:0},true);audio.observe({moving:true,shot:1},true);assert.equal(starts.length,2);audio.dispose();assert.equal(events.size,0);assert.ok(closed);}finally{globalThis.fetch=oldFetch;delete globalThis.window;delete globalThis.document;}
});
