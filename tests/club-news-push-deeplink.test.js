'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const router = fs.readFileSync(require.resolve('../app-home-deeplinks.js'), 'utf8');
const push = fs.readFileSync(require.resolve('../app-push.js'), 'utf8');
const flush = () => new Promise(resolve => setImmediate(resolve));

for (const source of ['query', 'early-push', 'warm-push']) {
  test('club news opens from ' + source + ' after its modal mounts', async () => {
    const timers = [], calls = [];
    let mounted = false;
    const location = {href: 'https://club.test/', search: source === 'query' ? '?startapp=club_news' : '', hash: ''};
    const context = {URL, URLSearchParams, Promise, Set, location,
      window: {location, addEventListener() {}, pokerOpenClubNewsModal: () => calls.push('news')},
      document: {readyState: 'complete', body: {getAttribute: () => 'home'}, getElementById: () => mounted ? {} : null},
      setTimeout: fn => timers.push(fn), isTelegramWebApp: () => false,
      pokerReadTelegramLaunchStartParam: () => '', pokerPushOpenDebug() {},
      pokerNormalizeWebAppStartParam: value => value || '', pokerStartAppQueryFromUrlSearchParams: sp => sp.get('startapp') || ''};
    vm.createContext(context);
    if (source === 'early-push') {
      context.d = {pokerChatOpenUrl: './?startapp=club_news'};
      const start = push.indexOf('      if (d.pokerChatOpenUrl) {');
      const end = push.indexOf('      if (d.pokerChatPushRepair)', start);
      vm.runInContext(push.slice(start, end), context);
      assert.equal(context.window.__pokerPendingPushOpenUrl, context.d.pokerChatOpenUrl);
    }
    vm.runInContext(router + '\npokerInitHomeDeepLinks();', context);
    if (source === 'warm-push') context.window.__pokerOpenChatFromPushUrl('./?startapp=club_news');
    if (timers.length) timers.shift()();
    await flush();
    assert.deepEqual(calls, [], 'must not claim success before the modal exists');
    mounted = true;
    for (let i = 0; timers.length && i < 50; i++) { timers.shift()(); await flush(); }
    assert.deepEqual(calls, ['news']);
    assert.ok(!context.window.__pokerPendingPushOpenUrl);
  });
}
