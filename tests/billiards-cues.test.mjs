import test from 'node:test';
import assert from 'node:assert/strict';
import {CUES,availableCue,heroFromHall} from '../scripts/billiards/cues.mjs';
test('cue unlock boundaries use own validated hero and fall back safely',()=>{
 assert.equal(new Set(CUES.map(c=>c.id)).size,8);
 for(const cue of CUES){assert.equal(availableCue(cue.id,cue.level).id,cue.id);if(cue.level)assert.equal(availableCue(cue.id,cue.level-1).id,'maple');}
 assert.equal(availableCue('missing',100).id,'maple');assert.equal(availableCue('signature',NaN).id,'maple');
 assert.throws(()=>heroFromHall({self:false,accountId:'other',garage:{stats:{level:100}}}));
 assert.throws(()=>heroFromHall({self:true,accountId:'me',garage:{stats:{level:'bad'}}}));
 assert.deepEqual(heroFromHall({self:true,accountId:'me',nick:'Hero',garage:{stats:{level:80}}}),{accountId:'me',nick:'Hero',level:80});
});
