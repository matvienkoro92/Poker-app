import test from 'node:test';
import assert from 'node:assert/strict';
import {sceneryAnchor} from '../scripts/stadium-race/scenery-slots.mjs';
test('scenery retains its identity and side across streaming boundaries in both directions',()=>{
 for(const distance of [199,599,9799,23999,25999]){
  const before=Array.from({length:32},(_,i)=>sceneryAnchor(i,32,distance,200));
  const after=Array.from({length:32},(_,i)=>sceneryAnchor(i,32,distance+2,200));
  assert.equal(new Set(after).size,32);
  for(let i=0;i<32;i++)if(before[i]!==after[i]){
   assert.ok(before[i]<distance-200,'only scenery behind camera may be recycled');
   assert.ok(after[i]>distance+5000,'replacement appears beyond the visible range');
  }
  for(let i=0;i<32;i++)assert.equal(sceneryAnchor(i,32,distance,200),before[i]);
 }
});
