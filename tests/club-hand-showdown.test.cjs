const {test}=require('node:test');const assert=require('node:assert/strict');
const {merge}=require('../scripts/backfill-club-showdown.cjs');
const replay={cards:['Qs','6s'],events:[{actorId:'996709',actor:'Игрок 996709'}],stacks:[{amount:5000}],shownOpponents:[]};
const patch={cards:['Qs','6s'],additions:[{playerId:'996709',cards:['As','Ac'],disclosure:'showdown-allin'}]};
test('add opponent cards without changing replay; repeated merge is idempotent',()=>{const r=merge(replay,patch,'286730');assert.deepEqual(r.shownOpponents,[{...patch.additions[0],actor:'Игрок 996709'}]);assert.deepEqual({...r,shownOpponents:[]},replay);assert.deepEqual(merge(r,patch,'286730'),r);assert.equal(replay.shownOpponents.length,0);});
test('reject wrong owner and own-card disclosure',()=>{assert.throws(()=>merge(replay,{...patch,cards:['Ad','Ac']},'286730'));assert.throws(()=>merge(replay,patch,'996709'));});

test('repair a legacy replay missing its winner while preserving losing opponent',()=>{const old=merge(replay,patch,'286730');const winner={playerId:'922131',cards:['Kh','Kc'],disclosure:'showdown-winner'};const updated=merge(old,{cards:patch.cards,additions:[...patch.additions,winner]},'286730');assert.equal(updated.shownOpponents.length,2);assert.deepEqual(updated.shownOpponents[0],old.shownOpponents[0]);assert.equal(updated.shownOpponents[1].disclosure,'showdown-winner');});

test('empty disclosure check preserves legacy replay without adding fields',()=>{const old={cards:['Qs','6s'],events:[]};assert.equal(merge(old,{cards:old.cards,additions:[]},'286730'),old);});
