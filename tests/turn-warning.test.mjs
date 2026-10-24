import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mountTurnWarning} from '../scripts/shared/turn-warning.mjs';
test('20 second emphasis and one beep per last-ten second, only for the visible player turn',()=>{
 const oldDocument=globalThis.document,oldWindow=globalThis.window,listeners={},tones=[];
 globalThis.document={hidden:false,addEventListener:(event,fn)=>listeners[event]=fn,removeEventListener(){}};
 class Audio{state='running';currentTime=0;destination={};createOscillator(){return {frequency:{},connect(){},disconnect(){},start(){},stop(){tones.push(1);this.onended();}};}createGain(){return {gain:{setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},disconnect(){}};}close(){return Promise.resolve();}}
 globalThis.window={AudioContext:Audio};
 try{const element={dataset:{}},clock=mountTurnWarning(element),update=(seconds,extra={})=>clock.update({seconds,active:true,sound:true,key:'turn1',...extra});listeners.pointerdown();update(21);assert.equal(element.dataset.timeWarning,'');update(20);assert.equal(element.dataset.timeWarning,'warning');assert.equal(tones.length,0);update(10);update(10);assert.equal(tones.length,1);assert.equal(element.dataset.timeWarning,'urgent');update(9,{sound:false});assert.equal(tones.length,1);update(9);assert.equal(tones.length,2);document.hidden=true;update(8);assert.equal(tones.length,2);document.hidden=false;update(8);assert.equal(tones.length,3);update(10,{key:'turn2'});assert.equal(tones.length,4);update(0);assert.equal(element.dataset.timeWarning,'');clock.dispose();}finally{globalThis.document=oldDocument;globalThis.window=oldWindow;}
});
