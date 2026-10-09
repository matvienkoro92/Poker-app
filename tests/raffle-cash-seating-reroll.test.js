'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { settleRaffleReadyWindows, raffleReadyMaxRerollRound } = require('../lib/api-handlers/raffles')._test;
const { buildRaffleCompletedAnnouncement } = require('../lib/raffle-group-notifications');
const now = new Date('2026-10-10T10:00:00Z');
function fixture(status = 'returned') {
  return { prizeKind: 'cash', groups: [{ prize: '1000 ₽', count: 1 }],
    participants: [{ userId: '1', p21Id: '11' }, { userId: '2', p21Id: '22', name: 'Новый' }],
    winners: [{ userId: '1', p21Id: '11', name: 'Первый', telegramUsername: 'first', groupIndex: 0,
      winnerReady: true, winnerReadyState: 'ready', winnerReadySlotId: 'initial_0',
      winnerStatus: 'ok', poker21PayoutStatus: 'completed',
      cashSeatingMonitor: { status },
    }] };
}
test('confirmed cash return rerolls a ready issued winner once and preserves the original payout', () => {
  const raffle = fixture();
  const result = settleRaffleReadyWindows(raffle, now);
  assert.equal(result.rerolled, true);
  assert.equal(result.rerollWinners.length, 1);
  assert.equal(raffle.winners[0].winnerReadyExpired, true);
  assert.equal(raffle.winners[0].poker21PayoutStatus, 'completed');
  const replacement = result.rerollWinners[0];
  assert.equal(replacement.userId, '2');
  assert.equal(replacement.winnerRerollFromUserId, '1');
  assert.equal(replacement.winnerReadyState, 'pending');
  assert.equal(replacement.poker21PayoutStatus, undefined);
  assert.equal(replacement.cashSeatingMonitor, undefined);
  assert.equal(settleRaffleReadyWindows(raffle, now).rerolled, false);
  const text = buildRaffleCompletedAnnouncement(raffle, now.getTime());
  assert.match(text, /Победители реролла:\n• Новый/);
  assert.match(text, /@first · ID 11 ❌ — не сел за 10 минут/);
  assert.doesNotMatch(text, /@first ✅/);
});
test('pending, seated and unconfirmed return never reroll a ready winner', () => {
  for (const status of ['pending', 'seated', 'returning']) {
    const raffle = fixture(status);
    assert.equal(settleRaffleReadyWindows(raffle, now).rerolled, false);
    assert.equal(raffle.winners.length, 1);
    assert.doesNotMatch(buildRaffleCompletedAnnouncement(raffle), /❌/);
  }
});
test('cash seating reroll respects the round limit and candidate availability', () => {
  const exhausted = fixture();
  exhausted.winners[0].winnerReadyRound = raffleReadyMaxRerollRound(exhausted);
  assert.equal(settleRaffleReadyWindows(exhausted, now).rerolled, false);
  assert.equal(exhausted.winners[0].winnerBurned, true);
  const empty = fixture();
  empty.participants = [];
  assert.equal(settleRaffleReadyWindows(empty, now).rerolled, false);
  assert.equal(empty.winners[0].winnerBurned, true);
});
