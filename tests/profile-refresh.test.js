const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { chromium } = require('playwright');

// Exercise the real initializer and real profile markup, with delayed API replies.
test('both profile refresh buttons share requests across repeated initialization', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.route('http://profile.test/**', route => route.fulfill({body: '<html></html>', contentType: 'text/html'}));
    await page.goto('http://profile.test/');
    await page.setContent(fs.readFileSync('html-fragments/profile.html', 'utf8'));
    await page.evaluate(() => {
      window.__pokerTelegramAuth = {status: 'verified'};
      window.getApiBase = () => 'http://profile.test';
      window.pokerApiAuthJsonBody = extra => ({...extra, pwaSession: 'test-session'});
      window.updateProfileHeroPokerPlusId = () => {};
      window.requests = [];
      window.replies = [];
      window.fetch = (url, options) => new Promise(resolve => {
        requests.push(JSON.parse(options.body));
        replies.push(profile => resolve({status: 200, json: async () => ({ok: true, linked: true, accountId: 'ID1', profile})}));
      });
      window.reply = nickname => replies.shift()({nickname, pokerPlusUserId: '21', syncedAt: Date.now(), totalCounter: {fee: 100}});
    });
    await page.addScriptTag({path: 'app-profile-pokerplus.js'});
    await page.evaluate(() => { initProfilePokerPlus(); initProfilePokerPlus(); initProfilePokerPlus(); });
    assert.equal(await page.evaluate(() => requests.length), 1);
    await page.evaluate(() => reply('Before'));
    await page.waitForFunction(() => document.getElementById('profilePokerPlusLinkedValue').textContent.includes('Before'));
    await page.evaluate(() => {
      document.getElementById('profileStatusRefreshBtn').click();
      initProfilePokerPlus();
    });
    await page.waitForFunction(() => requests.length === 2);
    assert.equal(await page.evaluate(() => requests[1].refresh), '1');
    assert.equal(await page.evaluate(() => document.getElementById('profileStatusRefreshBtn').disabled), true);
    assert.equal(await page.evaluate(() => document.getElementById('profilePokerPlusRefreshBtn').disabled), true);
    await page.evaluate(() => reply('First update'));
    await page.waitForFunction(() => !document.getElementById('profileStatusRefreshBtn').disabled);
    assert.match(await page.locator('#profilePokerPlusLinkedValue').textContent(), /First update/);
    await page.evaluate(() => document.getElementById('profilePokerPlusRefreshBtn').click());
    await page.waitForFunction(() => requests.length === 3);
    await page.evaluate(() => reply('Second update'));
    await page.waitForFunction(() => !document.getElementById('profilePokerPlusRefreshBtn').disabled);
    assert.match(await page.locator('#profilePokerPlusLinkedValue').textContent(), /Second update/);
    assert.equal(await page.evaluate(() => requests.filter(r => r.refresh).length), 2);

    // A timed-out refresh can still finish on the server. Polling must not
    // replace the displayed data with an older cached response in the meantime.
    await page.evaluate(() => {
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = (fn, delay, ...args) => originalSetTimeout(fn,
        delay === 15000 ? 50 : [1200, 3500, 8000, 14000, 22000].includes(delay) ? delay / 4 : delay, ...args);
      document.getElementById('profileStatusRefreshBtn').click();
    });
    await page.waitForFunction(() => requests.length === 4);
    await page.evaluate(() => replies.shift()); // Ignore the aborted request.
    await page.waitForFunction(() => document.getElementById('profileStatusRefreshBtn').textContent === 'Проверяем...');
    await page.waitForFunction(() => requests.length === 5);
    await page.evaluate(() => replies.shift()({nickname: 'Stale', pokerPlusUserId: '21', syncedAt: 1}));
    assert.match(await page.locator('#profilePokerPlusLinkedValue').textContent(), /Second update/);
    await page.waitForFunction(() => requests.length === 6);
    await page.evaluate(() => reply('Late update'));
    await page.waitForFunction(() => document.getElementById('profilePokerPlusLinkedValue').textContent.includes('Late update'));
    assert.equal(await page.locator('#profileStatusRefreshBtn').textContent(), 'Обновлено');
    assert.equal(await page.evaluate(() => JSON.parse(sessionStorage.getItem('poker_profile_pokerplus_last_linked_v1')).profile.nickname), 'Late update');
  } finally { await browser.close(); }
});
