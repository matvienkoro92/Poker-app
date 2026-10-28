import test from 'node:test';
import assert from 'node:assert/strict';
import {gameEntryRead} from '../scripts/shared/game-entry-read.mjs';
test('entry read recovers after a temporary service failure',async()=>{
 let calls=0;const body={action:'preview',roomId:'ABCDEFGHJK'};
 const result=await gameEntryRead(async request=>{assert.equal(request,body);if(++calls<2)throw Object.assign(Error('Temporary'),{status:503});return {ok:true};},body);
 assert.deepEqual(result,{ok:true});assert.equal(calls,2);
});
test('entry read does not retry denied access, missing rooms or update navigation',async()=>{
 for(const error of [Object.assign(Error('Denied'),{status:403}),Object.assign(Error('Missing'),{status:404}),Error('Обновляем игру.')]){
  let calls=0;await assert.rejects(gameEntryRead(async()=>{calls++;throw error;},{action:'access'}),e=>e===error);assert.equal(calls,1);
 }
});
test('entry read bounds retries after a lost network connection',async()=>{
 let calls=0;await assert.rejects(gameEntryRead(async()=>{calls++;throw TypeError('Failed to fetch');},{action:'access'}));assert.equal(calls,3);
});
