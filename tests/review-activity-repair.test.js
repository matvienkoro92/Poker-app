'use strict';
const test = require('node:test'), assert = require('node:assert/strict');
const { emptyState } = require('../lib/review-activity');
const { restoreCounters } = require('../lib/review-activity-repair');
test('restore historical publications, preserve money, award missing spin once', () => {
  const before = { ...emptyState(), actions:6, publicationActions:2, bonusEarned:40 };
  const after = restoreCounters(before,6,0);
  assert.equal(after.spinsEarned,1); assert.equal(after.spinsAvailable,1);
  assert.equal(after.actions,6); assert.equal(after.bonusEarned,40);
  assert.deepEqual(restoreCounters(after,6,0),after);
});
test('spent spins stay spent; old mixed-counter rewards are preserved', () => {
  const before = { ...emptyState(), actions:10, legacySpinsEarned:2, spinsEarned:2, spinsAvailable:0 };
  assert.equal(restoreCounters(before,10,0).spinsAvailable,0);
  const mixed=restoreCounters(before,6,4);
  assert.equal(mixed.legacySpinsEarned,1); assert.equal(mixed.spinsEarned,2);
  assert.equal(mixed.spinsAvailable,0);
  assert.throws(()=>restoreCounters(before,9,0),/evidence_mismatch/);
});
