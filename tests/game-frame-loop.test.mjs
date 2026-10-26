import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createFrameLoop} from '../scripts/shared/frame-loop.mjs';
test('quiet games park between checks, input wakes immediately, hidden games do no work',t=>{
 const originalRaf=globalThis.requestAnimationFrame,originalCancel=globalThis.cancelAnimationFrame;let serial=0,hidden=false,active=false,calls=0;const frames=new Map();
 globalThis.requestAnimationFrame=cb=>{const id=++serial;frames.set(id,cb);return id;};globalThis.cancelAnimationFrame=id=>frames.delete(id);t.mock.timers.enable({apis:['setTimeout']});
 const loop=createFrameLoop(()=>calls++,{active:()=>active,isHidden:()=>hidden,idleMs:200});
 const draw=()=>{const pending=[...frames.values()];frames.clear();for(const cb of pending)cb(calls*20);};
 try{loop.wake();loop.wake();assert.equal(frames.size,1);draw();assert.equal(calls,1);assert.equal(frames.size,0);t.mock.timers.tick(199);assert.equal(frames.size,0);loop.wake();assert.equal(frames.size,1);active=true;draw();assert.equal(frames.size,1);hidden=true;loop.pause();t.mock.timers.tick(10000);assert.equal(frames.size,0);loop.wake();assert.equal(frames.size,0);hidden=false;active=false;loop.wake();draw();assert.equal(calls,3);loop.dispose();t.mock.timers.tick(10000);assert.equal(frames.size,0);}finally{loop.dispose();t.mock.timers.reset();globalThis.requestAnimationFrame=originalRaf;globalThis.cancelAnimationFrame=originalCancel;}
});
