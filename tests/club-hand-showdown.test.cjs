const {test}=require('node:test');const assert=require('node:assert/strict');
const {merge}=require('../scripts/backfill-club-showdown.cjs');
const replay={cards:['Qs','6s'],events:[{actorId:'996709',actor:'Игрок 996709'}],stacks:[{amount:5000}],shownOpponents:[]};
const patch={cards:['Qs','6s'],additions:[{playerId:'996709',cards:['As','Ac'],disclosure:'showdown-allin'}]};
test('add opponent cards without changing replay; repeated merge is idempotent',()=>{const r=merge(replay,patch,'286730');assert.deepEqual(r.shownOpponents,[{...patch.additions[0],actor:'Игрок 996709'}]);assert.deepEqual({...r,shownOpponents:[]},replay);assert.deepEqual(merge(r,patch,'286730'),r);assert.equal(replay.shownOpponents.length,0);});
test('reject wrong owner and own-card disclosure',()=>{assert.throws(()=>merge(replay,{...patch,cards:['Ad','Ac']},'286730'));assert.throws(()=>merge(replay,patch,'996709'));});
