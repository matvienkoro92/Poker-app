import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createGameSound} from '../scripts/shared/game-audio.mjs';

test('game effects unlock the stream, recover iOS interruptions and retry failed loads',async()=>{
 const previous={window:globalThis.window,document:globalThis.document,fetch:globalThis.fetch};
 let context,requests=0,played=0,primed=0;
 class Audio {
  state='running';sampleRate=44100;
  constructor(){context=this;}
  resume(){this.state='running';return Promise.resolve();}
  createBuffer(){return {silent:true};}
  createBufferSource(){return {connect(){},disconnect(){},start(){if(this.buffer.silent)primed++;else played++;this.onended?.();},stop(){}};}
  createGain(){return {gain:{value:1},connect(){},disconnect(){}};}
  decodeAudioData(){return Promise.resolve({duration:.2});}
 }
 globalThis.window={AudioContext:Audio};globalThis.document={hidden:false,addEventListener(){},removeEventListener(){}};
 globalThis.fetch=async()=>({ok:++requests>1,arrayBuffer:async()=>new ArrayBuffer(1)});
 const sound=createGameSound('/effect.mp3');
 try{
  sound.play();await new Promise(setImmediate);assert.equal(played,0);assert.equal(primed,1);
  sound.play();await new Promise(setImmediate);assert.equal(played,1);assert.equal(requests,2);
  context.state='interrupted';sound.play();await new Promise(setImmediate);assert.equal(played,2);assert.equal(context.state,'running');
  document.hidden=true;sound.play();assert.equal(played,2);
 }finally{sound.dispose();Object.assign(globalThis,previous);}
});
