'use strict';
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(process.env.SMOKE_ROOT||'.');
(async()=>{const browser=await chromium.launch();try{for(const width of [390,320]){
const page=await browser.newPage({viewport:{width,height:844},serviceWorkers:'block'}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.route('**/*',route=>{const u=new URL(route.request().url());if(u.hostname!=='club.test')return route.fulfill({status:200,body:''});if(u.pathname.startsWith('/api/'))return route.fulfill({status:503,json:{ok:false,error:'Preview'}});const file=path.join(root,u.pathname==='/'?'index.html':u.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404,body:''});});
await page.goto('http://club.test/',{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);await page.evaluate(()=>{window.__pokerHideBootOverlay?.();setView('download');});await page.waitForSelector('.evening-reference__cooler-hit');await page.waitForTimeout(800);
await page.waitForFunction(()=>document.querySelector('[data-play-flow]')?.dataset.playPanel==='tournament');
for(let attempt=0;attempt<6;attempt++){
 await page.evaluate(async attempt=>{
  const flow=document.querySelector('[data-play-flow]'),left=attempt%2===0,start=left?280:60,end=left?60:280;
  function event(type,x){const t=new Touch({identifier:1,target:flow,clientX:x,clientY:350});flow.dispatchEvent(new TouchEvent(type,{bubbles:true,cancelable:true,touches:type==='touchend'?[]:[t],changedTouches:[t]}));}
  event('touchstart',start);
  for(let i=1;i<=12;i++){event('touchmove',start+(end-start)*i/12);await new Promise(requestAnimationFrame);}
  event('touchend',end);
 },attempt);
 await page.waitForTimeout(350);
 assert.equal(await page.locator('[data-play-flow]').getAttribute('data-play-panel'),attempt%2===0?'poker21':'tournament');
 assert.equal(await page.locator('.play-flow--dragging').count(),0);
}
assert.deepEqual(errors,[]);console.log('Six swipes passed',width);await page.close();
}}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
