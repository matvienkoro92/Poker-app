#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

async function main() {
  const source = fs.readFileSync(require('node:path').join(__dirname, '../app-shell-layout.js'), 'utf8');
  const cleanup = source.slice(source.indexOf('function initProfileKeyboardViewportCleanup()'), source.indexOf('// Инициализация Telegram WebApp'));
  const browser = await chromium.launch();
  try {
    for (const width of [390, 768]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.setContent('<body data-view="profile"><main class="card"><div class="card__content" style="height:600px;overflow:auto"><section class="view" data-view="profile"><input id="profileCityInput"><div style="height:4000px"></div></section></div></main></body>');
      await page.addScriptTag({ content: `var repairs = 0; function pokerFlushViewportAfterProfileFieldBlur() { repairs++; document.querySelector('.card__content').scrollTop = 0; }\n${cleanup}\ninitProfileKeyboardViewportCleanup();` });
      // Browser chrome can send resize events repeatedly during fast scrolling.
      await page.evaluate(() => {
        document.querySelector('.card__content').scrollTop = 900;
        for (let i = 0; i < 8; i++) visualViewport.dispatchEvent(new Event('resize'));
      });
      await page.waitForTimeout(400);
      assert.deepEqual(await page.evaluate(() => ({ repairs, y: document.querySelector('.card__content').scrollTop })), { repairs: 0, y: 900 });
      await page.locator('input').focus();
      await page.evaluate(() => visualViewport.dispatchEvent(new Event('resize')));
      await page.waitForTimeout(200);
      assert.equal(await page.evaluate(() => repairs), 0, 'Focused field must not be repaired');
      await page.locator('input').evaluate(el => el.blur());
      await page.evaluate(() => visualViewport.dispatchEvent(new Event('resize')));
      await page.waitForTimeout(400);
      assert.equal(await page.evaluate(() => repairs), 1, 'Keyboard blur still repairs the viewport once');
      await page.evaluate(() => {
        document.querySelector('.card__content').scrollTop = 1400;
        visualViewport.dispatchEvent(new Event('resize'));
      });
      await page.waitForTimeout(400);
      assert.deepEqual(await page.evaluate(() => ({ repairs, y: document.querySelector('.card__content').scrollTop })), { repairs: 1, y: 1400 });
      await page.close();
    }
    console.log('Profile scroll passed: resize bursts preserve scroll, active input stays focused, keyboard blur repairs once.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
