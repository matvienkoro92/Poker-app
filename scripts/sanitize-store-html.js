'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const web = path.resolve(__dirname, '../output/store-release/native/www');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ javaScriptEnabled: false });
    await context.route('**/*', route => route.abort());
    const page = await context.newPage();
    const files = [path.join(web, 'index.html'), ...fs.readdirSync(path.join(web, 'html-fragments')).filter(f => f.endsWith('.html')).map(f => path.join(web, 'html-fragments', f))];
    let removed = 0;
    for (const file of files) {
      const full = path.basename(file) === 'index.html';
      await page.setContent(fs.readFileSync(file, 'utf8'), { waitUntil: 'domcontentloaded' });
      removed += await page.evaluate(() => {
        const views = ['cashout', 'admin-bonuses', 'player-crm', 'video-lessons', 'learn-play-hub'];
        const selectors = views.map(v => `[data-view-target="${v}"],[data-view="${v}"]:not(body),[data-html-fragment-view="${v}"]`)
          .concat('[data-vpn-proxy-open]', '#vpnProxyOpenBtn', '.evening-vpn-cat', '.home-club-hero-banner', '.home-club-achievements-title');
        let count = 0;
        document.querySelectorAll(selectors.join(',')).forEach(el => { el.remove(); count++; });
        // Historical financial stories are omitted, never relabelled as chip activity.
        document.querySelectorAll('article[data-gazette-article]').forEach(el => {
          if (/деньг|денеж|на карту|зарплат|кредитор|пополн|депозит|кэшаут/i.test(el.textContent)) { el.remove(); count++; }
        });
        document.querySelectorAll('p,li').forEach(el => {
          if (/на карту|денежн|депозит|кэшаут|пополнени/i.test(el.textContent)) { el.remove(); count++; }
        });
        const legend = document.querySelector('.store-chip-legend');
        const home = document.querySelector('.view[data-view="home"]');
        if (legend && home) home.appendChild(legend);
        return count;
      });
      const result = await page.evaluate(full => full ? '<!doctype html>\n' + document.documentElement.outerHTML : document.body.innerHTML, full);
      fs.writeFileSync(file, result + '\n');
    }
    console.log(JSON.stringify({ sanitizedHtmlFiles: files.length, removedElements: removed }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
