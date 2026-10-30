'use strict';
// JSON clients cannot supply this key. It is attached only at authenticated API ingress.
const RECEIVED_AT = Symbol('game-request-received-at');
function moveTime(body, now) {
  const received = body[RECEIVED_AT];
  return body.action === 'move' && Number.isFinite(received) && received <= now ? received : now;
}
module.exports = { RECEIVED_AT, moveTime };
