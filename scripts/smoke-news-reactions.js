#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "../public");
const output = path.resolve(__dirname, "../output/news-reactions");
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".avif": "image/avif", ".json": "application/json" };

async function main() {
  fs.mkdirSync(output, { recursive: true });
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const file = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (error, body) => {
      res.writeHead(error ? 404 : 200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" });
      res.end(error ? "" : body);
    });
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    browser = await chromium.launch();

    for (const width of [390, 980]) {
      const ctx = await browser.newContext({viewport:{width,height:900},serviceWorkers:'block'});
      await ctx.route(/^https?:\/\/(?!127\.0\.0\.1(?::|\/))/,r=>r.fulfill({status:503,json:{ok:false}}));
      const page=await ctx.newPage(), errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.clock.setFixedTime(new Date('2026-09-12T00:22:00+07:00'));
      await page.addInitScript(()=>sessionStorage.setItem('poker_pwa_guest_session','1'));
  const feedbacks=new Map(), sent=[];
  await ctx.route('**/api/profile-event-feedback',async route=>{
    const body=route.request().postDataJSON();sent.push(body);
    const get=id=>{if(!feedbacks.has(id))feedbacks.set(id,{reactions:{},myReaction:'',commentCount:1,comments:[{id:'c1',author:'Киса',text:'Красавчик',at:'2026-09-10T12:00:00Z',reactions:{},myReaction:''}]});return feedbacks.get(id);};
    if(body.action==='view')return route.fulfill({json:{ok:true,feedback:Object.fromEntries(body.eventIds.map(id=>[id,get(id)]))}});
    const f=get(body.eventId),target=body.action==='comment-reaction'?f.comments[0]:f;
    if(body.action==='reaction'||body.action==='comment-reaction'){target.reactions={[body.emoji]:target.myReaction===body.emoji?0:1};target.myReaction=target.myReaction===body.emoji?'':body.emoji;}
    return route.fulfill({json:{ok:true,feedback:f}});
  });
  await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'networkidle'});
  await page.evaluate(()=>window.pokerOpenClubNewsModal());
  await page.waitForSelector('#homeFriendNewsModal:not([hidden])');
  await page.waitForTimeout(1500);

  const card=page.locator('#homeFriendNewsList [data-home-news-event-id]').first();
  await card.locator('[data-home-news-add-reaction]:not([data-comment-id])').click();
  const picker=page.locator('.profile-reaction-picker--news');
  await picker.waitFor({state:'visible'});
  assert.equal(await picker.evaluate(n=>getComputedStyle(n).position),'fixed');
  await picker.locator('[data-picker-reaction]').first().click();
  await page.waitForTimeout(150);
  assert.ok(sent.some(r=>r.action==='reaction'&&r.scope==='club'));
  await card.locator('[data-home-news-reaction-users]').first().click();
  const users=page.locator('.profile-reaction-users--news');
  await users.waitFor({state:'visible'});
  assert.equal(await users.evaluate(n=>getComputedStyle(n).position),'fixed');
  await users.locator('.profile-reaction-users__close').click();
  await card.locator('[data-home-news-comments]').click();
  await card.locator('[data-home-news-add-reaction][data-comment-id]').click();
  await picker.waitFor({state:'visible'});
  await picker.locator('[data-picker-reaction]').first().click();
  await page.waitForTimeout(150);
  assert.ok(sent.some(r=>r.action==='comment-reaction'&&r.commentId==='c1'));
  await card.locator('[data-home-comment-emoji-toggle]').click();
  await card.locator('.home-news-emoji-picker:not([hidden])').waitFor({state:'visible'});
  await card.locator('[data-home-comment-emoji]').first().click();
  assert.ok((await card.locator('input').inputValue()).length>0);
  const bounds=await card.evaluate(n=>{const a=n.querySelector('.home-friend-news-modal__day-hero').getBoundingClientRect(), b=n.querySelector('form').getBoundingClientRect();return {heroBottom:a.bottom,formTop:b.top};});
  assert.ok(bounds.heroBottom<=bounds.formTop,'Hero badge must stay above comment form');
  assert.deepEqual(errors,[]);
  await page.screenshot({path:path.join(output, 'reactions-'+width+'.png')});console.log('Passed real news clicks: event reaction, comment reaction, emoji insertion and badge placement',bounds);

      await ctx.close();
    }
  } finally {
    if(browser)await browser.close();server.closeAllConnections();
    await new Promise(resolve=>server.close(resolve));
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
