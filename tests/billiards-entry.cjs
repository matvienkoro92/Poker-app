'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = process.cwd();
const output = path.join(root, 'output/billiards');

async function settleCamera(page) {
  await page.evaluate(async () => {
    await Promise.all(document.querySelector('.player-hall__spaces').getAnimations().map(a => a.finished.catch(() => {})));
  });
}
async function freezePassage(page, time) {
  await page.waitForSelector('.player-hall__passage-camera');
  return page.evaluate(time => {
    const room = document.querySelector('.player-hall__room');
    for (const animation of room.getAnimations({ subtree: true })) {
      animation.pause();
      animation.currentTime = time;
    }
    const camera = room.querySelector('.player-hall__passage-camera');
    const stage = room.querySelector('.villa-billiards-stage');
    const stageRect = stage.getBoundingClientRect(), roomRect = room.getBoundingClientRect();
    return {
      zoom: new DOMMatrix(getComputedStyle(camera).transform).a,
      stageX: new DOMMatrix(getComputedStyle(stage).transform).e,
      center: stageRect.left + stageRect.width / 2,
      roomCenter: roomRect.left + roomRect.width / 2,
      opacity: Number(getComputedStyle(stage).opacity),
      inert: room.inert
    };
  }, time);
}
async function finishPassage(page, space) {
  await page.evaluate(() => document.querySelector('.player-hall__room').getAnimations({ subtree: true }).forEach(a => a.finish()));
  await page.waitForFunction(space => {
    const room = document.querySelector('.player-hall__room');
    return room.dataset.space === space && !room.inert && !room.querySelector('.player-hall__passage-camera');
  }, space);
}

(async () => {
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('http://hall.test/**', async route => {
      const file = path.join(root, new URL(route.request().url()).pathname);
      if (fs.existsSync(file) && fs.statSync(file).isFile()) await route.fulfill({ path: file });
      else await route.fulfill({ body: '<html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body></body></html>', contentType: 'text/html' });
    });
    await page.goto('http://hall.test/');
    for (const file of ['styles-base.css', 'styles-player-hall.css', 'styles-player-lounge.css']) await page.addStyleTag({ path: file });
    await page.addScriptTag({ path: 'app-garage-catalog.js' });
    await page.evaluate(() => {
      window.__pokerTelegramAuth = { status: 'verified', user: { id: 388008256 } };
      window.pokerEnsureLazyDomains = async () => {};
      window.pokerSocialRequest = async () => ({ hall: {
        accountId: 'me', name: 'ПокерМанки', nick: 'ПокерМанки', self: true, featured: [], items: [], themes: [], goals: [], achievementProgress: [], wins: 14, theme: 'walnut',
        lounge: { available: true, seats: [null, null, null, null, null], friends: [], liveAvailable: false },
        garage: { stats: { level: 75 }, loadout: { ...PokerGarage.defaults } }, levelProgress: { xp: 57562, target: 60000 }
      } });
      document.body.innerHTML = '<button data-player-hall-open>Открыть зал</button>';
      Math.random = () => .01;
    });
    for (const file of ['app-hall-card-pick.js', 'app-hall-table.js', 'app-player-lounge.js', 'app-garage-workshop.js', 'app-player-hall.js']) await page.addScriptTag({ path: file });
    await page.click('[data-player-hall-open]');
    await page.waitForSelector('.hall-table');
    await page.locator('[data-hall-light]').click();
    assert.equal(await page.locator('[data-hall-light]').getAttribute('aria-pressed'), 'true');
    await page.locator('[data-hall-space="lounge"]').click();
    await page.locator('[data-hall-map]').click();
    await page.waitForFunction(() => document.querySelector('.player-hall-map-scroll img')?.naturalWidth > 0);
    assert.ok((await page.locator('.player-hall-map-scroll img').getAttribute('src')).endsWith('coastal-house-map-v8.webp'));
    assert.ok(!(await page.locator('.player-hall-map-scroll img').getAttribute('alt')).includes('лестница наверх'));
    await page.screenshot({ path: path.join(output, 'villa-map-mobile.png') });
    await page.locator('[data-hall-detail-close]').click();
    await page.locator('.lounge-wall-board').click();
    await page.waitForSelector('.player-hall__lounge-panel');
    await page.locator('.player-hall__lounge-panel [data-lounge-focus=""]').first().click();
    await page.locator('[data-hall-space="hall"]:visible').first().click();
    await page.locator('[data-hall-space="garage"]:visible').click();
    await settleCamera(page);

    // A failed/slow room image must keep the garage visible and allow retry.
    await page.route('**/billiards-ocean-v5.webp', route => route.abort());
    await page.locator('[data-house-passage]').click();
    await page.waitForFunction(() => document.querySelector('[data-house-passage] small').textContent.includes('ещё раз'));
    assert.equal(await page.locator('.player-hall__room').getAttribute('data-space'), 'garage');
    assert.equal(await page.locator('.player-hall__room').evaluate(el => el.inert), false);
    await page.unroute('**/billiards-ocean-v5.webp');
    let releaseArt;
    const artGate = new Promise(resolve => { releaseArt = resolve; });
    await page.route('**/billiards-ocean-v5.webp', async route => { await artGate; await route.fulfill({ path: path.join(root, 'assets/player-hall/billiards-ocean-v5.webp') }); });
    await page.locator('[data-house-passage]').click();
    assert.equal(await page.locator('.player-hall__room').getAttribute('data-space'), 'garage');
    assert.equal(await page.locator('.player-hall__passage-camera').count(), 0);
    releaseArt();
    const approach = await freezePassage(page, 250);
    assert.equal(await page.locator('[data-house-passage] small').textContent(), 'Комната у бассейна');
    assert.ok(approach.zoom > 1, 'camera must approach the doorway');
    assert.equal(approach.opacity, 0, 'new room must wait for the approach');
    await page.screenshot({ path: path.join(output, 'passage-approach-mobile.png') });
    const reveal = await freezePassage(page, 650);
    assert.ok(reveal.zoom > approach.zoom, 'camera must keep moving forward');
    assert.ok(reveal.opacity > 0 && reveal.opacity < 1, 'room opens during approach');
    assert.equal(reveal.stageX, 0, 'destination must not slide horizontally');
    assert.ok(Math.abs(reveal.center - reveal.roomCenter) < 1, 'destination stays centered');
    assert.equal(reveal.inert, true, 'navigation is locked during the passage');
    await page.screenshot({ path: path.join(output, 'passage-reveal-mobile.png') });
    await finishPassage(page, 'billiards');
    assert.equal(await page.locator('.billiards-shell').count(), 0, 'passage opens room, not game');
    await page.screenshot({ path: path.join(output, 'villa-room-mobile.png') });

    await page.locator('[data-billiards-play=cues]').click();
    const cueFrame = page.frameLocator('.billiards-shell iframe');
    await cueFrame.locator('#cueDialog[open]').waitFor();
    await cueFrame.locator('#cueHero').filter({hasText:'уровень 75'}).waitFor();
    assert.equal(await cueFrame.locator('[data-cue=ruby]').isDisabled(),false);
    assert.equal(await cueFrame.locator('[data-cue=signature]').isDisabled(),true);
    await cueFrame.locator('#back').evaluate(el=>el.click());
    await page.waitForFunction(() => !document.querySelector('.billiards-shell'));

    await page.locator('[data-billiards-play=solo]').click();
    const frame = page.frameLocator('.billiards-shell iframe');
    await frame.locator('h1').waitFor();
    assert.equal(await frame.locator('h1').innerText(), 'Бильярдная');
    await frame.locator('#back').click();
    await page.waitForFunction(() => !document.querySelector('.billiards-shell'));
    assert.equal(await page.locator('.player-hall__room').getAttribute('data-space'), 'billiards');
    await page.locator('.villa-billiards-return').click();
    const returnEarly = await freezePassage(page, 250);
    const returnLate = await freezePassage(page, 850);
    assert.ok(returnLate.zoom < returnEarly.zoom, 'return must back out through the doorway');
    assert.equal(returnLate.stageX, 0);
    await finishPassage(page, 'garage');

    // The same doorway geometry works in a wide viewport.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.locator('[data-house-passage]').click();
    const desktop = await freezePassage(page, 650);
    assert.ok(desktop.zoom > 1);
    assert.ok(Math.abs(desktop.center - desktop.roomCenter) < 1);
    await page.screenshot({ path: path.join(output, 'passage-reveal-desktop.png') });
    await page.evaluate(() => document.querySelector('.player-hall__room').getAnimations({ subtree: true }).forEach(a => a.play()));
    await page.waitForFunction(() => {
      const room = document.querySelector('.player-hall__room');
      return room.dataset.space === 'billiards' && !room.inert;
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.villa-billiards-return').click();
    await finishPassage(page, 'garage');
    await page.locator('[data-house-passage]').click();
    await page.waitForFunction(() => document.querySelector('.player-hall__room').dataset.space === 'billiards');
    assert.equal(await page.locator('.player-hall__passage-camera').count(), 0);
    await page.locator('.villa-billiards-return').click();
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    // Closing the villa mid-transition must release the lock and discard animations.
    await page.locator('[data-house-passage]').click();
    await freezePassage(page, 250);
    await page.locator('[data-hall-close]').click();
    await page.waitForFunction(() => !document.querySelector('.player-hall__passage-camera'));
    await page.click('[data-player-hall-open]');
    await page.waitForSelector('.hall-table');
    assert.equal(await page.locator('.player-hall__room').getAttribute('data-space'), 'hall');
    assert.equal(await page.locator('.player-hall__room').evaluate(el => el.inert), false);
    assert.deepEqual(errors, []);
    console.log('PASS doorway approach/reveal and reverse, mobile/desktop, art failure/retry, solo return, reduced motion and cancellation');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
