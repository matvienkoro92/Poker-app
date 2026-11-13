const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');

function harness() {
  const commands = [];
  const dependencies = {
    crypto,
    '../redis': { isConfigured: () => true, pipeline: async batch => {
      commands.push(...batch);
      return batch.map(([op]) => ({ result: op === 'HGETALL' ? ['ID123456', '👍'] : op === 'LRANGE'
        ? [JSON.stringify({ id: 'c1', memberId: 'ID123456', text: 'hello', author: 'Player' })]
        : op === 'LLEN' ? 1 : op === 'HLEN' ? 7 : op === 'HGET' ? '👍' : null }));
    } },
    '../resolve-telegram-auth': { resolveTelegramIdentity: () => ({}), memberIdFromIdentity: () => 'user1' },
    '../account-id': { ensureDtIdForUserId: async () => 'ID123456', getPreferredUserIdByDtId: async id => id },
    '../pokerplus': {}, '../chat-profile-status': { pokerProfileStatusFromCachedProfile: () => ({}) },
    '../api-auth': { setCors() {}, isAdminIdentity: () => false },
    '../app-user-blocks': { rejectBlockedAppUser: async () => false },
    '../api-limits': { rateLimit: () => false, rejectIfPayloadTooLarge: () => false },
  };
  const context = { require: name => {
    assert.ok(name in dependencies, name); return dependencies[name];
  }, process: { env: {} }, module: { exports: {} }, console };
  vm.runInNewContext(fs.readFileSync(require.resolve('../lib/api-handlers/profile-event-feedback.js'), 'utf8'), context);
  async function request(body) {
    let data, status;
    await context.module.exports({ method: 'POST', body }, {
      status(code) { status = code; return this; }, json(value) { data = value; }, end() {},
    });
    assert.equal(status, 200);
    return data;
  }
  return { commands, request };
}

test('28 club cards fetch counts without comments or individual view operations', async () => {
  const h = harness();
  const ids = Array.from({ length: 28 }, (_, i) => 'event:' + i);
  const data = await h.request({ scope: 'club', action: 'view', eventIds: ids, summary: true });
  assert.equal(h.commands.length, 59); // 2 shared view writes + 1 count + 2 reads/card.
  assert.equal(h.commands.filter(c => c[0] === 'HLEN').length, 1);
  assert.equal(h.commands.filter(c => c[0] === 'LRANGE').length, 0);
  assert.equal(data.feedback['event:0'].commentCount, 1);
  assert.equal(data.feedback['event:0'].reactions['👍'], 1);
  assert.equal(data.feedback['event:0'].myReaction, '👍');
  assert.equal(data.feedback['event:0'].commentsLoaded, false);
  assert.equal(data.feedback['event:0'].comments, undefined);
  assert.equal(data.feedback['event:0'].viewCount, 7);
});

test('expanding one discussion returns its comments without recording a new view', async () => {
  const h = harness();
  const data = await h.request({ scope: 'club', action: 'list', eventIds: ['event:0'] });
  assert.equal(data.feedback['event:0'].comments[0].text, 'hello');
  assert.equal(data.feedback['event:0'].commentsLoaded, true);
  assert.equal(h.commands.filter(c => c[0] === 'LRANGE').length, 1);
  assert.equal(h.commands.filter(c => c[0] === 'HSET' || c[0] === 'EXPIRE').length, 0);
});

test('friend feed retains individual event views and full response compatibility', async () => {
  const h = harness();
  const data = await h.request({ scope: 'friends', action: 'view', eventIds: ['event:0'] });
  assert.equal(data.feedback['event:0'].comments.length, 1);
  assert.equal(h.commands.filter(c => c[0] === 'HSET').length, 1);
  assert.equal(h.commands.filter(c => c[0] === 'HLEN').length, 1);
});

test('a reaction on a closed card reads counts without hidden discussions or author profiles', async () => {
  const h = harness();
  const data = await h.request({ scope: 'club', action: 'reaction', eventId: 'event:0', emoji: '👍', summary: true });
  assert.equal(data.feedback.commentCount, 1);
  assert.equal(data.feedback.viewCount, 7);
  assert.equal(data.feedback.comments, undefined);
  assert.equal(data.feedback.commentsLoaded, false);
  assert.equal(h.commands.length, 5);
  assert.equal(h.commands.filter(c => c[0] === 'HLEN').length, 1);
  assert.equal(h.commands.filter(c => c[0] === 'LRANGE' || c[0] === 'GET').length, 0);
});

test('an open discussion retains full reaction responses and uses only the shared club view count', async () => {
  const h = harness();
  const data = await h.request({ scope: 'club', action: 'reaction', eventId: 'event:0', emoji: '👍' });
  assert.equal(data.feedback.comments[0].text, 'hello');
  assert.equal(data.feedback.commentsLoaded, true);
  assert.equal(h.commands.filter(c => c[0] === 'LRANGE').length, 1);
  assert.equal(h.commands.filter(c => c[0] === 'HLEN').length, 1);
});

test('closed card reactions preserve cached comments; open discussions request full updates', async () => {
  const source = fs.readFileSync(require.resolve('../app-home-friend-news.js'), 'utf8');
  const payloads = [];
  const comments = [{ id: 'c1', text: 'Keep this comment' }];
  const context = {
    eventFeedback: { event: { comments } }, eventCommentsOpen: {},
    optimisticFeedbackReaction: () => ({}), renderModalList() {}, activeModalEvents: () => [],
    feedbackRequest: async body => { payloads.push(body); return { feedback: { reactions: { '👍': 2 } } }; },
  };
  vm.runInNewContext(source.slice(source.indexOf('  function sendOptimisticReaction('), source.indexOf('  function showReactionUsers(')), context);
  await context.sendOptimisticReaction('event', '👍', '');
  assert.equal(payloads[0].summary, true);
  assert.equal(context.eventFeedback.event.comments, comments);
  context.eventCommentsOpen.event = true;
  await context.sendOptimisticReaction('event', '👍', '');
  assert.equal(payloads[1].summary, false);
  context.eventCommentsOpen.event = false;
  await context.sendOptimisticReaction('event', '👍', 'c1');
  assert.equal(payloads[2].summary, false);
});

test('client batches all event IDs, shares concurrent requests and isolates accounts', async () => {
  const source = fs.readFileSync(require.resolve('../app-home-friend-news.js'), 'utf8');
  const calls = [];
  let now = 1000000;
  const context = { friendAuthGeneration: 0, newsModalMode: 'club', Date: { now: () => now },
    feedbackRequest: async payload => {
      calls.push(payload);
      return { feedback: Object.fromEntries(payload.eventIds.map(id => [id, { commentCount: 2 }])) };
    },
  };
  vm.runInNewContext(source.slice(source.indexOf('  var feedbackSummaryCache'), source.indexOf('  function feedbackRequest(payload)')), context);
  const ids = Array.from({ length: 120 }, (_, i) => 'event:' + i);
  const [first, second] = await Promise.all([context.feedbackSummary(ids), context.feedbackSummary(ids)]);
  assert.equal(calls.length, 3);
  assert.ok(calls.every(call => call.eventIds.length <= 50 && call.summary));
  assert.equal(Object.keys(first.feedback).length, 120);
  assert.deepEqual(first, second);
  await context.feedbackSummary(ids);
  assert.equal(calls.length, 3);
  context.friendAuthGeneration++;
  await context.feedbackSummary(ids);
  assert.equal(calls.length, 6);
  now += 30001;
  await context.feedbackSummary(ids);
  assert.equal(calls.length, 9);
});
