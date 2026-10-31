'use strict';
const {chromium,webkit}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{for(const engine of [chromium,webkit]){const browser=await engine.launch();try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];let attempts=4,releasePlay;
 page.setDefaultTimeout(10000);
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('http://daily-spins.test/**',async route=>{
  const url=new URL(route.request().url());
  if(url.pathname.includes('/api/promo/daily-poker/')){
   if(url.pathname.endsWith('/play')){await new Promise(resolve=>releasePlay=resolve);return route.fulfill({status:503,json:{ok:false,error:'Тестовая ошибка'}});}
   return route.fulfill({json:url.pathname.endsWith('/status')?{ok:true,canPlay:attempts>0,attemptsLeft:attempts,bonusBalance:0,serverTime:new Date().toISOString()}:{ok:true,winners:[]}});
  }
  if(url.pathname==='/fixture')return route.fulfill({contentType:'text/html',body:'<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><div id="app" class="app" style="width:100%">'+fs.readFileSync('html-fragments/daily-poker.html','utf8').replace('class="view"','class="view view--active"')+'</div>'});
  const file=path.join(process.cwd(),url.pathname);return fs.existsSync(file)&&fs.statSync(file).isFile()?route.fulfill({path:file}):route.fulfill({status:404});
 });
 await page.goto('http://daily-spins.test/fixture');
 for(const css of ['styles.css','styles-daily-poker.css'])await page.addStyleTag({url:'http://daily-spins.test/'+css});
 await page.evaluate(()=>{window.getApiBase=()=>location.origin;window.pokerApiHasCredential=()=>true;window.testIdentity=123;window.getPokerResolvedTelegramUser=()=>({id:testIdentity});window.POKER_NET_ERR='Ошибка сети';});
 await page.addScriptTag({path:'app-daily-poker.js'});await page.evaluate(()=>initDailyPoker());
 await page.waitForFunction(()=>document.getElementById('dailyPokerAttemptsLeft').textContent==='Круток осталось: 4'&&!document.getElementById('dailyPokerPlayBtn').disabled);
 await page.locator('#dailyPokerPlayBtn').click();await page.waitForFunction(()=>document.getElementById('dailyPokerAttemptsLeft').textContent==='Круток осталось: 3');
 while(!releasePlay)await page.waitForTimeout(10);releasePlay();await page.waitForFunction(()=>document.getElementById('dailyPokerAttemptsLeft').textContent==='Круток осталось: 4');
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});await page.locator('[data-daily-poker-spins-info]').click();
  const help=page.locator('#dailyPokerSpinsHelp[open]');await help.waitFor();assert.match(await help.innerText(),/300 фишек/);assert.match(await help.innerText(),/нарды, шахматы или бильярд/);assert.match(await help.innerText(),/за весь матч/);
  const box=await help.boundingBox();assert.ok(box.x>=0&&box.x+box.width<=width+1);await help.locator('button').click();
 }
 attempts=0;await page.evaluate(()=>{testIdentity++;window.dispatchEvent(new Event('poker-telegram-auth'));});await page.waitForFunction(()=>document.getElementById('dailyPokerAttemptsLeft').textContent==='Круток осталось: 0');
 await page.screenshot({path:'/tmp/daily-poker-spins-'+engine.name()+'.png'});assert.deepEqual(errors,[]);
 console.log('PASS '+engine.name()+': remaining spins, immediate spend, rollback, zero and accessible help at 320/390px');
}finally{await browser.close();}}})().catch(e=>{console.error(e);process.exitCode=1;});
