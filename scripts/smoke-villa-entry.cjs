const {chromium}=require('playwright');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch();
  try{
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route('http://villa-entry.test/**',route=>{
      const url=new URL(route.request().url());
      if(url.pathname==='/fixture')return route.fulfill({contentType:'text/html',body:'<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/styles-player-hall.css"><button style="position:fixed;inset:0;z-index:2147483647">Background interface</button>'});
      const file=path.join(process.cwd(),url.pathname);
      return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
    });
    await page.goto('http://villa-entry.test/fixture');
    await page.evaluate(()=>{window.__pokerTelegramAuth={status:'guest'};window.pokerEnsureLazyDomains=async()=>{};});
    for(const file of ['app-garage-catalog.js','app-villa-entry.js'])await page.addScriptTag({path:file});
    await page.evaluate(()=>window.pokerShowVillaLoading());
    assert.equal(await page.locator('.player-hall-dialog').evaluate(el=>el.matches(':modal')),true,'Arrival is modal');
    await page.addScriptTag({path:'app-player-hall.js'});
    for(let attempt=0;attempt<2;attempt++){
      if(attempt)await page.evaluate(()=>window.pokerShowVillaLoading());
      await page.evaluate(()=>window.pokerOpenPlayerHall());
      await page.locator('.player-hall__room').waitFor();
      assert.equal(await page.locator('.player-hall-dialog').evaluate(el=>el.matches(':modal')),true,'Loaded villa stays modal');
      assert.equal(await page.evaluate(()=>document.querySelector('.player-hall-dialog').contains(document.elementFromPoint(195,400))),true,'Villa covers the background interface');
      await page.locator('.player-hall-dialog [data-hall-close]').click();
      assert.equal(await page.locator('.player-hall-dialog').evaluate(el=>el.open),false);
    }
    assert.deepEqual(errors,[]);
    console.log('PASS: first lazy handoff, foreground hit testing, close and reopen');
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
