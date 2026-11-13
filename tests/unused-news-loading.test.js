const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('an empty friend list skips friend-only sources and retains personal bet news', async () => {
  const source = fs.readFileSync(require.resolve('../app-home-friend-news.js'), 'utf8');
  const start = source.indexOf('      var friends = friendsPayload', source.indexOf('  function load(friendsOverride)'));
  const end = source.indexOf('    }).then(function (results)', start);
  const calls = [], personal = [{ id: 'personal-bet' }];
  const context = {
    base: '', suffix: '', joiner: '?', signature: '',
    cachedFetchJson: async url => { calls.push(url); return {}; },
    fetch: async url => { calls.push(url); return { ok: true, json: async () => ({ ok: true, posts: [] }) }; },
    enrichFriendsWithPoker21: friends => friends, tournamentSnapshotsReady: async () => ({}),
    loadSelfBetNews: async () => personal, pokerApiAuthJsonBody: body => body,
  };
  vm.runInNewContext('async function loadSources(friendsPayload) {' + source.slice(start, end) + '}', context);
  const empty = await context.loadSources({ friends: [] });
  assert.deepEqual(calls, []);
  assert.equal(empty[8], personal);
  assert.equal(empty[0].friends.length, 0);
  await context.loadSources({ friends: [{ accountId: 'ID123456' }] });
  assert.equal(calls.length, 6, 'A populated friend list still loads its live sources');
});

test('the vote badge pauses off home and while hidden, shares requests, and refreshes on return', async () => {
  const source = fs.readFileSync(require.resolve('../app-home-widgets-bootstrap.js'), 'utf8');
  let now = 1000000, view = 'home', finish, paints = 0;
  const calls = [];
  const context = {
    document: { hidden: true, body: { getAttribute: () => view }, getElementById: () => ({}) },
    Date: { now: () => now }, AbortController, setTimeout: () => 1, clearTimeout() {},
    getApiBase: () => '', renderClubChoiceRoundBadge: () => paints++,
    fetch(url, options) {
      calls.push({ url, options });
      return new Promise(resolve => { finish = () => resolve({ ok: true, json: async () => ({ ok: true }) }); });
    },
  };
  vm.runInNewContext(source.slice(source.indexOf('  var clubChoiceBadgePromise'), source.indexOf('  function setBusy(')), context);
  await context.refreshClubChoiceRoundBadge();
  assert.equal(calls.length, 0);
  context.document.hidden = false;
  view = 'profile';
  await context.refreshClubChoiceRoundBadge();
  assert.equal(calls.length, 0);
  view = 'home';
  const first = context.refreshClubChoiceRoundBadge(), duplicate = context.refreshClubChoiceRoundBadge();
  assert.equal(calls.length, 1);
  finish(); await Promise.all([first, duplicate]);
  assert.equal(paints, 1);
  await context.refreshClubChoiceRoundBadge();
  assert.equal(calls.length, 1);
  now += 45001;
  const next = context.refreshClubChoiceRoundBadge();
  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, '/api/club-choice-vote?summary=1');
  assert.equal(calls[1].options.cache, 'default');
  finish(); await next;
});
