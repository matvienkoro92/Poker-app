import test from 'node:test';
import assert from 'node:assert/strict';
import {createAutoRollController} from '../scripts/board-games/auto-roll.mjs';
test('opening tie waits for its reading pause, sends once and cancels on a manual roll',async t=>{t.mock.timers.enable({apis:['setTimeout']});let calls=0;const auto=createAutoRollController(()=>calls++,{isVisible:()=>true});const tie={enabled:true,canRoll:true,key:'opening-tie-1',delay:1500};auto.update(tie);t.mock.timers.tick(1000);auto.update(tie);assert.equal(calls,0);t.mock.timers.tick(500);await Promise.resolve();assert.equal(calls,1);auto.update(tie);t.mock.timers.tick(2000);await Promise.resolve();assert.equal(calls,1);auto.update({...tie,key:'opening-tie-2'});auto.update({...tie,key:'opening-tie-2',canRoll:false});t.mock.timers.tick(2000);await Promise.resolve();assert.equal(calls,1);auto.reset();t.mock.timers.reset();});

test('reserve grace period rolls if ignored and cancels when a saved six is selected',async t=>{
 t.mock.timers.enable({apis:['setTimeout']});
 let calls=0;
 const auto=createAutoRollController(()=>calls++,{isVisible:()=>true});
 const offer={enabled:true,canRoll:true,key:'reserve-1',delay:5000};
 auto.update(offer);
 t.mock.timers.tick(4999);
 assert.equal(calls,0);
 t.mock.timers.tick(1);
 await Promise.resolve();
 assert.equal(calls,1);

 const next={...offer,key:'reserve-2'};
 auto.update(next);
 t.mock.timers.tick(1000);
 auto.update({...next,canRoll:false});
 t.mock.timers.tick(5000);
 await Promise.resolve();
 assert.equal(calls,1);

 auto.update({...next,delay:250});
 t.mock.timers.tick(250);
 await Promise.resolve();
 assert.equal(calls,2);
});
