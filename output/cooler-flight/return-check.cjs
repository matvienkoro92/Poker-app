'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(process.env.SMOKE_ROOT||'.');
(async()=>{const browser=await chromium.launch();try{for(const width of [390,320]){
const page=await browser.newPage({viewport:{width,height:844},serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/*',route=>{const u=new URL(route.request().url());if(u.hostname!=='club.test')return route.fulfill({status:200,body:''});if(u.pathname.startsWith('/api/'))return route.fulfill({status:503,json:{ok:false,error:'Preview'}});const file=path.join(root,u.pathname==='/'?'index.html':u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404,body:''});});
await page.goto('http://club.test/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(800);await page.evaluate(()=>window.__pokerHideBootOverlay?.());
for(const origin of ['profile','download'])for(const game of ['cooler-flight','monkey-race']){
 await page.evaluate(origin=>setView(origin),origin);await page.waitForFunction(origin=>document.body.dataset.view===origin,origin);await page.waitForTimeout(500);
 await page.evaluate(game=>setView(game),game);
 const back=game==='cooler-flight'?'.cooler-flight__back':'[data-race-action="back"]';await page.waitForSelector(back);await page.click(back);
 await page.waitForFunction(origin=>document.body.dataset.view===origin,origin);assert.equal(await page.evaluate(()=>document.body.dataset.view),origin);
}
assert.deepEqual(errors,[]);console.log('Return origins passed',width);await page.close();
}}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
