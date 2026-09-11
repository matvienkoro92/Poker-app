#!/usr/bin/env node
"use strict";
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "..");
const staticRoot = path.resolve(root, process.env.SMOKE_ROOT || "public");
const baseline = process.env.CSS_BASELINE_DIR && path.resolve(process.env.CSS_BASELINE_DIR);
const out = path.resolve(root, "output/css-loading-2026-09-11", baseline ? "modal-before" : "modal-after");
const mime = {".html":"text/html", ".css":"text/css", ".js":"text/javascript", ".json":"application/json", ".svg":"image/svg+xml", ".webp":"image/webp", ".png":"image/png"};
async function main() {
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, "http://localhost").pathname;
    const file = path.resolve(staticRoot, "." + (pathname === "/" ? "/index.html" : pathname));
    if (!file.startsWith(staticRoot + path.sep)) {res.writeHead(403);res.end();return;}
    fs.readFile(file, (err, body) => {
      if (err) {res.writeHead(404);res.end();return;}
      res.writeHead(200, {"Content-Type": mime[path.extname(file)] || "application/octet-stream", "Cache-Control":"no-store"});
      res.end(body);
    });
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  let browser;
  try {
    fs.mkdirSync(out, {recursive:true});
    browser = await chromium.launch();
    const context = await browser.newContext({viewport:{width:390,height:844}, serviceWorkers:"block"});
    await context.route(/^https?:\/\/(?!127\.0\.0\.1(?::|\/))/, route => route.fulfill({status:503,contentType:"application/json",body:'{"ok":false}'}));
    let newsRequests = 0, sectionRequests = 0, rejectNews = false;
    await context.route(/styles-(?:home-news-modal|section-layout)\.css/, async route => {
      const news = route.request().url().includes("home-news-modal");
      if (news) {newsRequests++;await new Promise(resolve=>setTimeout(resolve,400));}
      else sectionRequests++;
      if (news && rejectNews) return route.fulfill({status:503,body:"Styles temporarily unavailable"});
      return route.continue();
    });
    if (baseline) {
      await context.route(/\/styles[^/]*\.css(?:\?|$)/, route => {
        const name=path.basename(new URL(route.request().url()).pathname), file=path.join(baseline,"before-css",name);
        return fs.existsSync(file) ? route.fulfill({contentType:"text/css",body:fs.readFileSync(file)}) : route.continue();
      });
      await context.route(/\/app-home-friend-news\.js(?:\?|$)/, route=>route.fulfill({contentType:"text/javascript",body:fs.readFileSync(path.join(baseline,"before-app-home-friend-news.js"))}));
    }
    const url = `http://127.0.0.1:${server.address().port}/`;
    const page = await context.newPage();
    const errors=[];
    page.on("pageerror",error=>errors.push(error.message));
    const alerts=[];
    page.on("dialog",async dialog=>{alerts.push(dialog.message());await dialog.dismiss();});
    await page.goto(url,{waitUntil:"domcontentloaded"});
    await page.waitForFunction(()=>typeof window.pokerOpenClubNewsModal === "function");
    await page.waitForTimeout(1500);
    if (!baseline) {
      assert.equal(newsRequests,0,"Closed news must not request modal CSS");
      assert.equal(sectionRequests,0,"Home must not request section layout CSS");
      rejectNews=true;
      await page.evaluate(()=>window.pokerOpenClubNewsModal());
      await page.waitForFunction(()=>document.getElementById("homeFriendNewsModal")?.hidden === true);
      for(let i=0;i<30 && !alerts.length;i++)await page.waitForTimeout(100);
      assert.equal(alerts.length,1,"Stylesheet failure must give a retryable error");
      assert.equal(await page.locator("#homeFriendNewsModal").isVisible(),false);
      rejectNews=false;
    }
    await page.evaluate(()=>window.pokerOpenClubNewsModal());
    if (!baseline) assert.equal(await page.locator("#homeFriendNewsModal").isVisible(),false,"Wait for CSS before revealing the modal");
    await page.locator("#homeFriendNewsModal").waitFor({state:"visible"});
    await page.waitForTimeout(800);
    for(const width of [390,1280]) {
      await page.setViewportSize({width,height:844});
      await page.screenshot({path:path.join(out,`news-${width}.png`),animations:"disabled"});
      const styles=await page.evaluate(()=>Array.from(document.querySelectorAll('#homeFriendNewsModal, #homeFriendNewsModal *')).filter(el=>el.getBoundingClientRect().width && el.getBoundingClientRect().height).slice(0,300).map(el=>{const st=getComputedStyle(el);return {tag:el.tagName,id:el.id,cls:el.className,css:Array.from(st).map(p=>[p,st.getPropertyValue(p)]).filter(([p])=>!p.startsWith('--'))};}));
      fs.writeFileSync(path.join(out,`news-${width}-styles.json`),JSON.stringify(styles));
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth+1),true,"News must fit viewport");
    }
    if (!baseline) {
      assert.equal(newsRequests,2,"One failed request plus one successful retry");
      await page.evaluate(()=>window.pokerOpenClubNewsModal());
      assert.equal(newsRequests,2,"Reopening reuses the loaded stylesheet");
      await page.locator("#homeFriendNewsModal .home-friend-news-modal__close").first().click();
      await page.evaluate(()=>setView("profile"));
      await page.waitForFunction(()=>document.body.getAttribute("data-view")==="profile");
      assert.equal(sectionRequests,1,"First non-home section loads shared layout once");
      await page.evaluate(()=>setView("home"));
      await page.waitForFunction(()=>document.body.getAttribute("data-view")==="home");
    }
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({ok:true,baseline:!!baseline,newsRequests,sectionRequests,screenshots:out}));
  } finally {
    if(browser)await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
}
main().catch(err=>{console.error(err);process.exitCode=1;});
