const test = require('node:test');
const assert = require('node:assert/strict');
const windowRows = require('./helpers/september-pilot-window.json');
// The original preview manifest was not retained. This reconstructed subset
// reproduces the historical assertions; the full ten-minute window is tested below.
const selected = new Set(['hand-14','hand-16','hand-17','hand-18','hand-19','hand-20','hand-21','hand-22']);
const sample = {playerId:'pilot', reviewed:windowRows.length, rows:windowRows.filter(row=>selected.has(row.handId)),
  excluded:windowRows.filter(row=>!selected.has(row.handId))};

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

test('complete ten-minute projection reconciles independently by format and unit', () => {
  const cash = aggregate(windowRows, {playerId:'pilot', mode:'cash', cashUnit:'TABLE_CHIP'});
  const tournament = aggregate(windowRows, {playerId:'pilot', mode:'mtt'});
  const sng = aggregate(windowRows, {playerId:'pilot', mode:'sng'});
  assert.deepEqual([cash.count,cash.resultMinor],[3,-198000]);
  assert.deepEqual([tournament.count,tournament.resultMinor],[20,84764507]);
  assert.equal(sng.count,0);
});
