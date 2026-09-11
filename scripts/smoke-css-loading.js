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
const out = path.resolve(root, process.env.CSS_OUTPUT_DIR || "output/css-loading-2026-09-11", baseline ? "modal-before" : "modal-after");
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
    let newsRequests = 0, sectionRequests = 0, infoRequests = 0, plannerRequests = 0, rejectNews = false;
    await context.route(/styles-(?:home-news-modal|section-layout|home-info-modals|home-planner-modal)\.css/, async route => {
      const info = route.request().url().includes("home-info-modals");
      const news = route.request().url().includes("home-news-modal") || info;
      if (info) infoRequests++;
      if (route.request().url().includes("home-planner-modal")) plannerRequests++;
      if (news) {newsRequests++;await new Promise(resolve=>setTimeout(resolve,400));}
      else sectionRequests++;
      if (news && rejectNews) return route.fulfill({status:503,body:"Styles temporarily unavailable"});
      return route.continue();
    });
    if (baseline) {
      await context.route(/\/assets\//, route=>{
        const name=path.basename(new URL(route.request().url()).pathname), file=path.join(root,"assets",name);
        return fs.existsSync(file) ? route.fulfill({body:fs.readFileSync(file),contentType:mime[path.extname(file)] || "application/octet-stream"}) : route.continue();
      });
      await context.route(/\/styles[^/]*\.css(?:\?|$)/, route => {
        const name=path.basename(new URL(route.request().url()).pathname), file=path.join(baseline,"before-css",name);
        return fs.existsSync(file) ? route.fulfill({contentType:"text/css",body:fs.readFileSync(file)}) : route.continue();
      });
      await context.route(/\/app[^/]*\.js(?:\?|$)/, route=>{
        const file=path.join(baseline,"before-"+path.basename(new URL(route.request().url()).pathname));
        return fs.existsSync(file) ? route.fulfill({contentType:"text/javascript",body:fs.readFileSync(file)}) : route.continue();
      });
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
    if (process.env.SMOKE_INFO_MODALS === "1") {
      await page.evaluate(()=>window.pokerEnsureGlobalModalsHtml());
      await page.waitForFunction(()=>typeof window.openClubCharterModal === "function");
      if (!baseline) {
        assert.equal(infoRequests,0,"Closed information dialogs must not load CSS");
        rejectNews=true;
        await page.evaluate(()=>window.openClubCharterModal());
        for(let i=0;i<40 && !alerts.length;i++)await page.waitForTimeout(100);
        assert.equal(alerts.length,1,"Failed dialog stylesheet must report a retryable error");
        assert.equal(await page.locator("#clubCharterModal").isVisible(),false);
        rejectNews=false;
      }
      const cases = [
        ["charter","openClubCharterModal","#clubCharterModal","#clubCharterModalClose"],
        ["welcome","openClubWelcomeModal","#clubWelcomeModal","#clubWelcomeModalClose"],
        ["vpn","openVpnProxyModal","#vpnProxyModal","#vpnProxyModalClose"],
        ["gazette","openGazette","#gazetteModal","#gazetteModalClose"],
        ["referrals","openClubReferralsModal","#clubReferralsModal",".club-referrals-modal__close"],
        ["installation","__pokerOpenSiteHomeInstructionModal","#siteHomeInstructionModal","#siteHomeInstructionModalClose"],
        ["planner","pokerOpenRomanTaskPlanner","#romanTaskPlannerModal","#romanTaskPlannerModalClose"]
      ];
      for(const [name,open,selector,close] of cases) {
        if (name === "planner") {
          if (!baseline) {
            await page.evaluate(()=>window.pokerOpenRomanTaskPlanner());
            assert.equal(await page.locator(selector).isVisible(),false,"Guest cannot open editor planner");
            assert.equal(plannerRequests,0,"Guest must not load editor CSS");
          }
          // Isolated fixture only: all external API requests are blocked above.
          await page.evaluate(()=>{
            window.__pokerTelegramAuth={status:"verified",adminAccess:true,user:{id:1001,first_name:"CSS test"}};
            if(window.__pokerSyncRomanTaskPlanner)window.__pokerSyncRomanTaskPlanner();
          });
        }
        await page.evaluate(fn=>window[fn](),open);
        await page.locator(selector).waitFor({state:"visible"});
        await page.waitForTimeout(300);
        for(const width of [390,1280]) {
          await page.setViewportSize({width,height:844});
          const styles=await page.evaluate(sel=>Array.from(document.querySelectorAll(sel+", "+sel+" *")).filter(el=>{const st=getComputedStyle(el);return el.getBoundingClientRect().width && el.getBoundingClientRect().height && st.visibility!=="hidden";}).slice(0,300).map(el=>{const st=getComputedStyle(el);return {tag:el.tagName,id:el.id,cls:el.className,css:Array.from(st).map(p=>[p,st.getPropertyValue(p)]).filter(([p])=>!p.startsWith('--'))};}),selector);
          fs.writeFileSync(path.join(out,`${name}-${width}-styles.json`),JSON.stringify(styles));
          await page.screenshot({path:path.join(out,`${name}-${width}.png`),animations:"disabled"});
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true,name+" must fit viewport");
        }
        await page.locator(close).first().click();
        await page.locator(selector).waitFor({state:"hidden"});
      }
      if (!baseline) {
        assert.equal(infoRequests,2,"Failed request plus one successful shared CSS load");
        assert.equal(plannerRequests,1,"Authorized editor loads planner CSS once");
      }
      assert.deepEqual(errors,[]);
      console.log(JSON.stringify({ok:true,baseline:!!baseline,infoRequests,plannerRequests,cases:cases.length,screenshots:out}));
      return;
    }
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
