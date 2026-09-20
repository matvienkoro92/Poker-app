'use strict';
const { normalizeState, TARGET } = require('./review-activity');

// Offline repair only: counts must come from persisted activityAward.action
// records, including deleted posts. Never infer earned rewards from a daily quota.
function restoreCounters(raw, publications, comments) {
  const state = normalizeState(raw);
  if (![publications, comments].every(n => Number.isSafeInteger(n) && n >= 0) ||
      publications + comments !== state.actions) throw new Error('activity_evidence_mismatch');
  const earned = Math.floor(publications / TARGET) + Math.floor(comments / TARGET);
  const added = Math.max(0, earned - state.spinsEarned);
  return normalizeState({ ...state, publicationActions: publications, commentActions: comments,
    legacySpinsEarned: Math.max(0, state.spinsEarned - earned),
    spinsEarned: state.spinsEarned + added, spinsAvailable: state.spinsAvailable + added });
}
module.exports = { restoreCounters };
