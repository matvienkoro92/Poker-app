'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),policy=require('../lib/board-games-wager-rules'),fixture=require('./helpers/board-wager-fixture.cjs');
for(const discipline of ['short','long'])for(const [mars,min]of [[1.1,1.2],[1.5,2],[1.75,2.5],[2,3],[5.5,10]])test(`${discipline}: mars ${mars} requires koks >= ${min}`,()=>{
 assert.equal(policy.minimumKoks(mars),min);
 for(const koks of [1,mars,min-.01])assert.throws(()=>policy.rules({discipline,marsMultiplier:mars,koksMultiplier:koks}),/не меньше/);
 assert.equal(policy.rules({discipline,marsMultiplier:mars,koksMultiplier:min}).koksMultiplier,min);
 if(min<10)assert.equal(policy.rules({discipline,marsMultiplier:mars,koksMultiplier:10}).koksMultiplier,10);
});
test('disabled bonuses remain available; lone koks must exceed the base stake',()=>{assert.deepEqual(policy.rules({discipline:'short'}),{marsMultiplier:1,koksMultiplier:1});assert.equal(policy.rules({discipline:'long',koksMultiplier:1.01}).koksMultiplier,1.01);});
test('invalid creation cannot reserve funds or create a room',async()=>{const f=fixture();for(const koks of [undefined,1,1.5,1.99])await assert.rejects(f.service.call('m1',{action:'create',discipline:'short',stake:500,requestId:'minimum_koks_test_01',marsMultiplier:1.5,koksMultiplier:koks}),/не меньше/);assert.equal(f.changes.length,0);assert.equal(f.rooms.size,0);});
test('existing room settings keep their original reserve and settlement',()=>{const settings={discipline:'short',marsMultiplier:1.5,koksMultiplier:1};assert.equal(policy.reserve(500,settings),750);assert.equal(policy.settlement({stake:500,settings},{state:{endReason:'borne-off',winKind:'koks'}}),500);});
