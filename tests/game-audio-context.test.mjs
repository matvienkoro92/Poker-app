import {test} from 'node:test';
import assert from 'node:assert/strict';
import {unlockGameAudio,playGameAudio} from '../scripts/shared/game-audio-context.mjs';
test('effects share one stream, suspend in silence, wake for sounds and wait for active playback',async t=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;let created=0,suspended=0,resumed=0;
 class Audio{state='running';constructor(){created++;}suspend(){suspended++;this.state='suspended';return Promise.resolve();}resume(){resumed++;this.state='running';return Promise.resolve();}}
 globalThis.window={AudioContext:Audio};globalThis.document={hidden:false};t.mock.timers.enable({apis:['setTimeout']});
 try{
 const a=unlockGameAudio();for(let i=0;i<5;i++)assert.equal(unlockGameAudio(),a);assert.equal(created,1);
 t.mock.timers.tick(601);assert.equal(a.state,'suspended');
 let release;playGameAudio(a,done=>release=done);await Promise.resolve();assert.equal(resumed,1);assert.ok(release);
 t.mock.timers.tick(2000);assert.equal(suspended,1);release();t.mock.timers.tick(601);assert.equal(suspended,2);
 document.hidden=true;let played=false;playGameAudio(a,()=>played=true);assert.equal(played,false);assert.equal(resumed,1);
 document.hidden=false;a.state='interrupted';let recovered=false;playGameAudio(a,done=>{recovered=true;done();});await Promise.resolve();assert.equal(recovered,true);assert.equal(resumed,2);
 }finally{t.mock.timers.reset();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
