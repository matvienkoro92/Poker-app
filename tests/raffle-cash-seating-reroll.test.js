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
  assert.match(text, /Победители реролла:\n⏳ Новый/);
  assert.match(text, /❌ Первый — @first · ID 11\nНе сел за 10 минут/);
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

test('expired and returned prize slots cannot be issued again', () => {
  const { raffleWinnerPrizeForfeited } = require('../lib/api-handlers/raffles')._test;
  for (const winner of [
    {winnerReadyExpired:true}, {winnerBurned:true}, {winnerReadyState:'missed'}, {winnerReadyState:'burned'},
    {cashSeatingMonitor:{status:'returning'}}, {cashSeatingMonitor:{status:'returned'}},
  ]) assert.equal(raffleWinnerPrizeForfeited(winner), true);
  for (const winner of [{winnerReady:true}, {winnerReadyState:'pending'}, {cashSeatingMonitor:{status:'seated'}}]) {
    assert.equal(raffleWinnerPrizeForfeited(winner), false);
  }
});

test('a candidate ineligible for the first group remains available for a later group', () => {
  const raffle = fixture();
  raffle.groups = [{prize:'1000 ₽', count:1, accessLevel:10}, {prize:'300 ₽', count:1, accessLevel:1}];
  raffle.participants = [{userId:'3', p21Id:'33', pokerPlusStatusLevel:1}];
  raffle.winners.push({...raffle.winners[0], userId:'4', p21Id:'44', groupIndex:1, winnerReadySlotId:'initial_1'});
  const result = settleRaffleReadyWindows(raffle, now);
  assert.equal(result.rerollWinners.length, 1);
  assert.equal(result.rerollWinners[0].groupIndex, 1);
  assert.equal(result.rerollWinners[0].userId, '3');
  assert.equal(raffle.winners[0].winnerBurned, true);
  assert.equal(result.rerollWinners[0].winnerReadyDeadlineAt, '2026-10-10T10:15:00.000Z');
});
test('ready deadline expires exactly at the boundary, with a fresh window for the replacement', () => {
  const raffle = fixture('pending');
  Object.assign(raffle.winners[0], {winnerReady:false, winnerReadyState:'pending', winnerReadyDeadlineAt:now.toISOString()});
  delete raffle.winners[0].cashSeatingMonitor;
  assert.equal(settleRaffleReadyWindows(raffle, new Date(now.getTime()-1)).rerolled, false);
  const result = settleRaffleReadyWindows(raffle, now);
  assert.equal(result.rerolled, true);
  assert.equal(result.rerollWinners[0].winnerReadyDeadlineAt, '2026-10-10T10:15:00.000Z');
  assert.equal(settleRaffleReadyWindows(raffle, now).rerolled, false);
});
