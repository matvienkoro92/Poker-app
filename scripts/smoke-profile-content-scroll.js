#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const navigation = fs.readFileSync('app-navigation-scroll.js', 'utf8');
const profile = fs.readFileSync('app-profile.js', 'utf8');
const sng = fs.readFileSync('app-sng-champions.js', 'utf8');
(async () => {
  const browser = await chromium.launch();
  try {
    for (const width of [390, 768]) for (const anchoring of ["auto", "none"]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.setContent(`<body data-view="profile"><main class="card"><div class="card__content" style="height:700px;overflow:auto;overflow-anchor:${anchoring}"><div id="profileView"><section id="profileSngTournaments" hidden></section><section id="upper" style="height:500px"></section><section id="profileOwnWall"><div id="profileOwnWallList"></div></section><div style="height:2000px"></div></div></div></main></body>`);
      await page.addStyleTag({ content: '.chat-user-modal__news-item{display:block;height:180px;margin:12px}.profile-sng-card{height:100px}summary{height:40px}' });
      await page.addScriptTag({ content: navigation });
      if (process.env.PROFILE_SCROLL_BASELINE) await page.evaluate(() => { window.pokerPreserveProfileScrollDuringUpdate = undefined; });
      await page.addScriptTag({ content: 'function profileEscapeHtml(value){return String(value||"");}\n' + profile.slice(0, profile.indexOf('function refreshProfileOwnWall(force)')) });
      await page.evaluate(() => {
        const now = new Date();
        profileOwnWallState.tournaments = Array.from({length:10}, (_,i) => ({id:'row-'+i,text:'Event '+i,at:now.toISOString()}));
        profileOwnWallState.tournaments.push({id:'previous',text:'Last month',at:new Date(now.getFullYear(),now.getMonth()-1,10).toISOString()});
        renderProfileOwnWall();
        document.querySelector('.card__content').scrollTop = 850;
        window.apiAuthQuery = () => '?guest=1'; window.baseUrl = () => ''; window.API_PATH = '/sng'; window.escapeHtml = profileEscapeHtml;
        window.fetch = () => new Promise(resolve => { window.replySng = data => resolve({ok:true,json:async()=>data}); });
      });
      await page.addScriptTag({content:sng.slice(sng.indexOf('  var profileTournamentsRequest ='),sng.indexOf('  function bind()'))});
      const visible = page.locator('[data-profile-scroll-key="wall-row-2"]');
      const top = await visible.evaluate(el => el.getBoundingClientRect().top);
      await page.evaluate(() => { refreshProfileTournaments(); replySng({ok:true,tournaments:[{id:'live',title:'Battle',status:'bracket'}]}); });
      await page.waitForTimeout(100);
      assert.ok(Math.abs(await visible.evaluate(el => el.getBoundingClientRect().top) - top) < 1, 'Late upper card must preserve the reading position without native anchoring');
      await page.evaluate(() => { window.originalRow = document.querySelector('[data-profile-scroll-key="wall-row-2"]'); renderProfileOwnWall(); });
      assert.equal(await page.evaluate(() => originalRow === document.querySelector('[data-profile-scroll-key="wall-row-2"]')),true,'Same data must keep the existing DOM');
      await page.evaluate(() => { document.querySelector('details').open = true; profileOwnWallState.tournaments.push({id:'new',text:'New',at:new Date().toISOString()}); renderProfileOwnWall(); });
      assert.equal(await page.locator('details').evaluate(el => el.open),true,'New data must keep the month expanded');
      await page.evaluate(() => { profileOwnWallState.tournaments.unshift({id:'late-news',text:'Late news above the visible row',at:new Date().toISOString()}); renderProfileOwnWall(); });
      assert.ok(Math.abs(await visible.evaluate(el=>el.getBoundingClientRect().top)-top)<1,'A new news item above the reader must not move the visible row');
      const beforeRefresh = await page.locator('.card__content').evaluate(el => el.scrollTop);
      await page.evaluate(() => refreshProfileTournaments());
      assert.equal(await page.locator('#profileSngTournaments').evaluate(el=>el.hidden),false,'Request must retain upper content');
      assert.equal(await page.locator('.card__content').evaluate(el=>el.scrollTop),beforeRefresh);
      await page.evaluate(() => replySng({ok:true,tournaments:[]}));
      await page.waitForTimeout(100);
      assert.ok(Math.abs(await visible.evaluate(el => el.getBoundingClientRect().top) - top) < 1,'Removal of upper card must preserve the visible content');
      await page.addScriptTag({content:'var profilePublicShowcaseArtSeq=0; var profilePublicShowcaseArtEnsureSeq=0;\n' + profile.slice(profile.indexOf('function profilePublicShowcaseSyncArt('),profile.indexOf('function profilePublicShowcaseSyncKnownArt('))});
      const beforeArt = await page.evaluate(() => {
        const hero = document.createElement('section'); hero.id = 'profilePublicShowcase';
        hero.innerHTML = '<div id="profilePublicRatingArt"><div id="profilePublicHeroAvatar" style="height:60px"></div><img id="profilePublicRatingArtImg" style="height:240px;width:100%" hidden></div>';
        document.getElementById('upper').after(hero);
        window.pokerGetSummerRatingPlayerArt = () => ({src:'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240"><rect width="400" height="240" fill="gold"/></svg>')});
        const top = document.querySelector('[data-profile-scroll-key="wall-row-2"]').getBoundingClientRect().top;
        profilePublicShowcaseSyncArt('Player', {});
        return top;
      });
      await page.waitForFunction(() => !document.getElementById('profilePublicRatingArtImg').hidden);
      assert.ok(Math.abs(await visible.evaluate(el=>el.getBoundingClientRect().top) - beforeArt)<1,'Late portrait image must preserve reading position');
      await page.mouse.move(width / 2, 350);
      const beforeWheel = await page.locator('.card__content').evaluate(el=>el.scrollTop);
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(350);
      const afterWheel = await page.locator('.card__content').evaluate(el=>el.scrollTop);
      assert.ok(afterWheel > beforeWheel, 'Native scrolling must continue after a content update');
      await page.waitForTimeout(400);
      assert.equal(await page.locator('.card__content').evaluate(el=>el.scrollTop),afterWheel,'No delayed correction can pull the gesture back');
      await page.close();
    }
    console.log('Passed at 390/768px: delayed upper content, repeated wall data, expanded month, pending SNG refresh, new news above the reader, late portrait and upper-card removal.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
