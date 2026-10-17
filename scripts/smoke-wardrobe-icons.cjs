'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  try {
    for (const failImages of [false, true]) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('https://wardrobe.test/**', route => {
        const pathname = new URL(route.request().url()).pathname;
        if (failImages && pathname.includes('/wardrobe/icons/')) return route.fulfill({ status: 404, body: '' });
        const file = path.join(process.cwd(), pathname);
        return fs.existsSync(file) && fs.statSync(file).isFile()
          ? route.fulfill({ path: file })
          : route.fulfill({ contentType: 'text/html', body: '<meta charset="utf-8"><body></body>' });
      });
      await page.goto('https://wardrobe.test/');
      await page.setContent('<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><dialog class="player-hall-dialog"><section class="player-hall__section-panel"><div class="garage-workshop" data-focus="suit"></div></section></dialog>');
      for (const file of ['styles-base.css', 'styles-player-hall.css', 'styles-garage-technical-menu.css']) await page.addStyleTag({ path: file });
      for (const file of ['app-garage-catalog.js', 'app-garage-workshop.js']) await page.addScriptTag({ path: file });
      await page.evaluate(() => {
        document.querySelector('dialog').showModal();
        pokerMountGarageWorkshop(document.querySelector('.garage-workshop'), { stats: { level: 100 }, loadout: PokerGarage.defaults }, true, async () => ({}));
      });
      let checked = 0;
      for (const family of ['clothes', 'body', 'jewelry', 'head']) {
        await page.locator('[data-wardrobe-family="' + family + '"]').click();
        await page.waitForFunction(() => [...document.querySelectorAll('.garage-categories img[data-garage-wardrobe-icon]')].every(img => img.complete));
        const icons = await page.locator('.garage-categories .garage-category-icon').evaluateAll(nodes => nodes.map(node => {
          const image = node.querySelector('img'), svg = node.querySelector('svg');
          return { loaded: image.naturalWidth > 0, imageVisible: getComputedStyle(image).display !== 'none', svgVisible: getComputedStyle(svg).display !== 'none', path: svg.querySelector('path').getAttribute('d') };
        }));
        assert.ok(icons.length > 0);
        for (const icon of icons) {
          assert.equal(icon.loaded, !failImages);
          assert.equal(icon.imageVisible, !failImages);
          assert.equal(icon.svgVisible, failImages);
          assert.ok(icon.path.length > 15);
          checked++;
        }
      }
      assert.equal(checked, 14);
      assert.deepEqual(errors, []);
      await page.close();
      console.log('PASS all 14 wardrobe icons: ' + (failImages ? '404 uses visible vector fallback' : 'images load and vectors stay hidden'));
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
