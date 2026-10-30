'use strict';
const ACCOUNT_KNOWN_AT = 'poker_app:attribution:v1:account_known_at';
// knownAt is an upper bound established by a real older operation, not a fabricated signup date.
function registrationStatus(account, registrationAt, knownAt, firstVisitAt) {
  if (!account) return 'guest';
  if (Number.isFinite(knownAt) && knownAt < firstVisitAt) return 'returning';
  if (!Number.isFinite(registrationAt)) return 'unknown';
  return registrationAt < firstVisitAt ? 'returning' : 'new';
}
module.exports = { ACCOUNT_KNOWN_AT, registrationStatus };
