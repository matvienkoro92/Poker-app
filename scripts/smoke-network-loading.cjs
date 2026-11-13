'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..', process.env.SMOKE_ROOT || '.');

(async () => {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
    const files = [], api = [], errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.pathname.startsWith('/api/')) {
        const body = route.request().postDataJSON() || {};
        api.push({ path: url.pathname, body });
        const feedback = {};
        for (const id of body.eventIds || []) feedback[id] = {
          reactions: { '👍': 1 }, reactors: [], commentCount: 1, viewCount: 3,
          ...(body.summary ? { commentsLoaded: false } : { commentsLoaded: true,
            comments: [{ id: 'comment-fixture', text: 'Проверка загрузки обсуждения', author: 'Игрок', at: new Date().toISOString() }] }),
        };
        return route.fulfill({ json: { ok: true, levelRows: [], winners: [], rows: [], posts: [],
          friends: [], events: [], entries: [], feedback } });
      }
      if (url.hostname !== 'network.test') return route.abort();
      const file = path.resolve(root, '.' + (url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname)));
      if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) return route.fulfill({ status: 404, body: '' });
      files.push(url.pathname);
      return route.fulfill({ path: file });
    });
    await page.addInitScript(() => sessionStorage.setItem('poker_pwa_guest_session', '1'));
    await page.goto('http://network.test/', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.pokerOpenClubNewsModal === 'function');
    await page.waitForTimeout(1500);
    const deferred = () => files.filter(file => /app-(?:garage|bicycle|scooter|admin-deposits)/.test(file));
    assert.deepEqual(deferred(), [], 'Closed garage and deposits must not download at startup');
    assert.equal(files.filter(file => file === '/club-news-data.js').length, 1, 'Reuse the embedded news snapshot');
    assert.equal(api.filter(call => call.path === '/api/profile-wall' && call.body.action === 'club-feed').length, 0);
    await page.evaluate(() => window.pokerOpenClubNewsModal());
    await page.waitForSelector('#homeFriendNewsModal:not([hidden]) [data-home-news-reaction-users]');
    assert.ok(files.includes('/app-garage-catalog.js'), 'News opens with the shared character renderer');
    assert.equal(files.filter(file => file === '/app-garage-catalog.js').length, 1);
    assert.equal(api.filter(call => call.path === '/api/profile-event-feedback' && call.body.action === 'list').length, 0, 'Closed discussions do not fetch details');
    const comment = page.locator('#homeFriendNewsModal [data-home-news-reaction-users]').first();
    await comment.click();
    await page.waitForFunction(() => document.getElementById('homeFriendNewsModal').textContent.includes('Проверка загрузки обсуждения'));
    const detailRequests = api.filter(call => call.path === '/api/profile-event-feedback' && call.body.action === 'list');
    assert.equal(detailRequests.length, 1);
    assert.equal(detailRequests[0].body.eventIds.length, 1);
    assert.equal(files.filter(file => file === '/club-news-data.js').length, 1);
    assert.equal(api.filter(call => call.path === '/api/profile-wall' && call.body.action === 'club-feed').length, 0);
    await page.evaluate(async () => {
      await window.pokerEnsureGlobalModalsHtml?.();
      sessionStorage.removeItem('poker_pwa_guest_session');
      window.pokerReadPwaGuestMode = () => false;
      window.pokerApiHasCredential = () => true;
      window.__pokerTelegramAuth = { adminAccess: true, status: 'authenticated' };
      const report = document.getElementById('adminReportBtn');
      if (report) { report.hidden = false; report.disabled = false; }
      document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
      document.querySelector('#homeFriendNewsModal [data-home-friend-news-close]').click();
      localStorage.setItem('poker_admin_menu_access_deposits', JSON.stringify({ token: 'local-fixture', expiresAt: Date.now() + 60000 }));
      const target = document.getElementById('headerDepositsShortcutBtn');
      target.hidden = false;
      target.disabled = false;
      target.click();
    });
    await page.waitForSelector('dialog.deposits[open]', {timeout:10000}).catch(async error => {
      console.log(JSON.stringify({errors, deposits:files.filter(f=>/deposits/.test(f)), state:await page.evaluate(()=>({button:document.getElementById('headerDepositsShortcutBtn').outerHTML,access:window.pokerHasAdminMenuAccess?.('deposits'),dialogs:[...document.querySelectorAll('dialog')].map(d=>d.outerHTML.slice(0,400))}))},null,2)); throw error;
    });
    assert.equal(files.filter(file => file === '/app-admin-deposits.js').length, 1);
    assert.equal(files.filter(file => file === '/app-admin-deposits-parser.js').length, 1);
    assert.equal(files.filter(file => file === '/styles-admin-deposits.css').length, 1);
    await page.evaluate(() => document.querySelector('dialog.deposits').close());
    await page.evaluate(async () => {
      await window.pokerEnsureViewScripts('profile');
      setView('profile');
    });
    assert.equal(await page.evaluate(() => typeof window.PokerGarage?.normalize), 'function');
    assert.equal(files.filter(file => file === '/app-garage-catalog.js').length, 1);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ startupNewsDownloads: 1, startupFeatureDownloads: 0,
      discussionDetailRequests: detailRequests.length, backgroundWallRequests: 0, errors }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
