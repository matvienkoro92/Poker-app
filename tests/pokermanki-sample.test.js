const test = require('node:test');
const assert = require('node:assert/strict');
const sample = require('../output/hand-statistics-preview/pokermanki-sample');
const {aggregate} = require('../lib/hand-statistics');
test('PokerManки pilot reconciles its scope, totals and separate formats',()=>{
  const a=aggregate(sample.rows,{playerId:sample.playerId,mode:'mtt'});
  assert.equal(a.count,8);
  assert.equal(a.count+sample.excluded.length,sample.reviewed);
  assert.equal(a.resultMinor,900000);
  assert.ok(Math.abs(a.bb-61/120)<1e-10);
  assert.deepEqual(a.excluded,{});
  assert.equal(a.cells.find(c=>c.label==='AJo').resultMinor,4500000);
  assert.equal(a.cells.find(c=>c.label==='52o').resultMinor,-2500000);
  assert.equal(aggregate(sample.rows,{playerId:sample.playerId,mode:'cash'}).count,0);
  assert.equal(aggregate(sample.rows,{playerId:sample.playerId,mode:'sng'}).count,0);
  for(const row of sample.rows){
    assert.ok(!sample.excluded.some(x=>x.handId===row.handId));
    assert.ok(row.playedAt.startsWith('2026-09-09T19:2'));
  }
});
