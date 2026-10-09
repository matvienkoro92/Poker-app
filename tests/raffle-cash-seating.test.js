'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {observations, confirmed} = require('../lib/raffle-cash-seating');
test('only actual cash seats in the club count, never missing positions or tournaments', () => {
  const base = {leagueId:'184691', playType:'NLH', pos:{pos1:'123',pos2:'0'}};
  assert.deepEqual(observations([base, {...base, pos:null}, {...base,playType:'MTT',pos:{pos1:'456'}}, {...base,leagueId:'other',pos:{pos1:'789'}}], 100), [['HSET','poker_app:raffle_cash_last_seen','123','100']]);
});
test('seating evidence must follow issuance and survives leaving the table', () => {
  const winner = {winnerStatus:'ok',winnerStatusAt:'2026-10-09T10:00:00Z'};
  const issued = Date.parse(winner.winnerStatusAt);
  assert.equal(confirmed(winner,issued-1),false);
  assert.equal(confirmed(winner,issued+1),true);
  assert.equal(confirmed(winner,undefined),false);
  assert.equal(confirmed({...winner,winnerStatus:'fail'},issued+1),false);
  assert.equal(confirmed({...winner,winnerStatusAt:''},issued+1),false);
  assert.deepEqual(observations([],issued+100),[]);
});
const {decision, WINDOW_MS} = require('../lib/raffle-cash-seating');
const issuedAt = '2026-10-09T10:00:00Z';
const monitored = () => ({winnerStatus:'ok',cashSeatingMonitor:{status:'pending',issuedAt,userId:'123',amount:300}});
test('ten minute deadline, seat confirmation, incomplete snapshots and returned states', () => {
  const start = Date.parse(issuedAt);
  assert.equal(decision(monitored(),[],start+WINDOW_MS-1),'wait');
  assert.equal(decision(monitored(),[],start+WINDOW_MS),'return');
  assert.equal(decision(monitored(),[{leagueId:'184691',playType:'NLH',playerCount:2,pos:null}],start+WINDOW_MS),'wait');
  assert.equal(decision(monitored(),[{leagueId:'184691',playType:'NLH',pos:{pos1:'123'}}],start+100),'seated');
  assert.equal(decision({...monitored(),winnerSeatStatus:'seated'},[],start+WINDOW_MS),'seated');
  const returning=monitored();returning.cashSeatingMonitor.status='returning';
  assert.equal(decision(returning,[],start+WINDOW_MS),'return');
  returning.cashSeatingMonitor.status='returned';
  assert.equal(decision(returning,[],start+WINDOW_MS),'done');
  assert.equal(decision({winnerStatus:'ok'},[],start+WINDOW_MS),'done');
});
